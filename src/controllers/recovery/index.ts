import bcrypt from "bcrypt";
import { Router } from "express";
import createError from "http-errors";
import User from "../../models/User";
import { db } from "../../services";
import { SALT_ROUNDS, TITLE } from "../../utils/constants";

import { isValidPassword } from "../../helpers";
const router = Router();

router
  .get("/", async (req, res) => {
    const user = req.user;
    const requestId = req.query.id;
    if (!requestId) {
      res.status(400).send({ error: "Route requires id" });
      return;
    }
    const [resetTarget] = await db("users").where({
      recovery_request: requestId,
    });
    if (!resetTarget) {
      res.send(createError(404, "Recovery code no longer valid"));
      return;
    }

    res.render("recovery.pug", {
      TITLE,
      requestId,
      resetTarget,
      user,
    });
  })
  .post("/", async (req, res) => {
    const { requestId, password, confirmPassword } = req.body;
    if (
      !requestId ||
      !password ||
      !confirmPassword ||
      !isValidPassword(req.body)
    ) {
      res.send(createError(400, "Malformed password reset payload"));
      return;
    }

    const [user] = await db("users").where({
      recovery_request: requestId,
    });
    if (!user) {
      res.send(createError(404, "No recovery request found"));
      return;
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    await db("users")
      .where({
        user_id: user.user_id,
      })
      .update({
        hash,
        recovery_request: "",
      });
    res.sendStatus(200);
  });

export default router;
