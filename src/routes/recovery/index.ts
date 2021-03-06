import bcrypt from "bcrypt";
import { Router } from "express";
import createError from "http-errors";
import { db } from "../../services";
import { SALT_ROUNDS } from "../../utils/constants";

import first from "lodash.first";
import { isValidPassword } from "../../helpers";
const router = Router();

router
  .get("/", async (req, res, next) => {
    const requestId: string = req.query.id;
    if (!requestId) {
      return next(createError(401, "Route requires id"));
    }
    const resetTarget = await db("users")
    .first()
    .where({
      recovery_request: requestId,
    }) as (IUser | undefined);

    if (!resetTarget) {
      return next(createError(404, "Recovery code no longer valid"));
    }

    res.send({
      requestId,
      resetTarget,
    });
  })
  .post("/", async (req, res, next) => {
    const { requestId, password, confirmPassword } = req.body;
    if (
      !requestId ||
      !password ||
      !confirmPassword ||
      !isValidPassword({password, confirmPassword})
    ) {
      return next(createError(400, "Malformed password reset payload"));
    }

    const targetUser: (IUser | undefined) = first(await db("users").where({
      recovery_request: requestId,
    }));
    if (!targetUser) {
      return next(createError(404, "No recovery request found"));
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    await db("users")
      .where({
        user_id: targetUser.user_id,
      })
      .update({
        hash,
        recovery_request: "",
      });
    res.sendStatus(200);
  });

export default router;
