import bcrypt from "bcrypt";
import { Router } from "express";
import createError from "http-errors";
import jwt from "jsonwebtoken";
import first from "lodash.first";
import isEmpty from "lodash.isempty";
import { isValidSignupCredentials } from "../../helpers";
import { db, logger } from "../../services";
import { SALT_ROUNDS, TITLE } from "../../utils/constants";

const { JWT_SECRET } = process.env;

const router = Router();

router
  .route("/")
  .get((req, res) => {
    let user;
    if (req.isAuthenticated()) {
      user = req.user;
    }
    res.render("register.pug", {
      TITLE,
      user,
    });
  })
  .post(async (req, res) => {
    if (!req.body || !req.body.username || !req.body.password) {
      return res.sendStatus(400);
    }
    req.body.username = req.body.username.trim();
    if (isValidSignupCredentials(req.body)) {
      const username = req.body.username;
      // Check if username exists; case insensitive
      const usernameExists = !isEmpty(
        await db.raw(
          `SELECT * FROM users WHERE LOWER(username)=LOWER('${
            req.body.username
          }')`,
        ).rows,
      );
      if (usernameExists) {
        logger.warn(`User ${username} already exists`);
        return res.send(createError(409, `User ${username} already exists`));
      }
      const key = first(
        await db("keys")
          .select("key_id", "discord_id")
          .where("key", req.body.key)
          .andWhere("owner", null),
      );
      if (!key) {
        return res.send(createError(404, `Key ${key} not found`));
      }
      const keyID = key.key_id;
      const hash = await bcrypt.hash(req.body.password, SALT_ROUNDS);
      const userId = first(
        await db("users")
          .returning("user_id")
          .insert({
            created_at: new Date(),
            discord_id: key.discord_id,
            faction: null,
            hash,
            health: 100,
            hunger: 100,
            role: 3,
            thirst: 100,
            username,
          }),
      );
      await db("keys")
        .where("key_id", keyID)
        .update("owner", userId);
      const token = jwt.sign(
        {
          userId,
          username,
        },
        JWT_SECRET,
      );
      res.json({
        token,
      });
    }
  });

export default router;
