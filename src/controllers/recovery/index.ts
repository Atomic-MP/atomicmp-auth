import bcrypt from "bcrypt";
import { Router } from "express";
import createError from "http-errors";
import { IUser } from "../../models/User";
import { db } from "../../services";
import { SALT_ROUNDS } from "../../utils/constants";

import first from "lodash.first";
import { isValidPassword } from "../../helpers";
const router = Router();

router
  .get("/", async (req, res) => {
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

    res.send({
      requestId,
      resetTarget,
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
      const err = createError(400, "Malformed password reset payload");
      res.status(err.status).send(err);
      return;
    }

    const user: (IUser | undefined) = first(await db("users").where({
      recovery_request: requestId,
    }));
    if (!user) {
      const err = createError(404, "No recovery request found");
      res.status(err.statusCode).send(err);
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
