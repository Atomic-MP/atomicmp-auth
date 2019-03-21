import { Router } from "express";
import jwt from "jsonwebtoken";
import loginStrategy from "../../middlewares/login-strategy";
import { logger } from "../../services";
import { TITLE } from "../../utils/constants";
const JWT_SECRET = process.env.JWT_SECRET || '';
const router = Router();

router
  .route("/")
  .get((req, res) => {
    const user = req.user;
    res.render("login.pug", {
      TITLE,
      user,
    });
  })
  .post((req, res) => {
    loginStrategy.authenticate("local", (err, user) => {
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
