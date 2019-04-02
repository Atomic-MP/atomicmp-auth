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

    const user: (IUser | undefined) = first(await db("users").where({
      recovery_request: requestId,
    }));
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
