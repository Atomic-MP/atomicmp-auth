import { Router } from "express";
import jwt from "jsonwebtoken";
import loginStrategy from "../../middlewares/login-strategy";
import User from "../../models/User";
import { logger } from "../../services";
const JWT_SECRET = process.env.JWT_SECRET || "";
const router = Router();

router
  .route("/")
  .post(async (req, res) => {
    loginStrategy.authenticate("local", (err: Error, user: User) => {
      if (err) {
        logger.error(err);
        res.send(err);
        return;
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
        res.sendStatus(401);
      }
    })(req, res);
  });

export default router;
