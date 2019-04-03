import { Router } from "express";
import createError from "http-errors";
import jwt from "jsonwebtoken";
import loginStrategy from "../../middlewares/login-strategy";
import User from "../../models/User";
import { logger } from "../../services";
const JWT_SECRET = process.env.JWT_SECRET || "";
const router = Router();

router
  .route("/")
  .post(async (req, res, next) => {
    loginStrategy.authenticate("local", (err: Error, user: User) => {
      if (err) {
        logger.error(err);
        return next(createError(503, "Authentication method failed"));
      }
      if (user) {
        const token = jwt.sign(
          {
            userId: user.user_id,
            username: user.username,
          },
          JWT_SECRET,
        );
        res.json({ token });
      } else {
        return next(new createError.Unauthorized("Bearer token denied"));
      }
    })(req, res, next);
  });

export default router;
