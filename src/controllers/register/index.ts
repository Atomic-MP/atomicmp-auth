import bcrypt from "bcrypt";
import { Router } from "express";
import createError from "http-errors";
import jwt from "jsonwebtoken";
import first from "lodash.first";
import isEmpty from "lodash.isempty";
import { isValidSignupCredentials } from "../../helpers";
import Key from "../../models/Key";
import { db, logger } from "../../services";
import { SALT_ROUNDS, TITLE } from "../../utils/constants";

const JWT_SECRET = process.env.JWT_SECRET || "";

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
    if (isValidSignupCredentials(req.body)) {
      const username: string = req.body.username.trim();
      // Check if username exists; case insensitive

      const usernameExists: boolean = !isEmpty((await db.raw(
        `SELECT * FROM users WHERE LOWER(username)=LOWER('${
        req.body.username
        }')`,
      )).rows);
      if (usernameExists) {
        logger.warn(`User ${username} already exists`);
        return res.send(createError(409, `User ${username} already exists`));
      }
      const key = new Key(first(
        await db("keys")
          .select("key_id", "discord_id")
          .where("key", req.body.key)
          .andWhere("owner", null)
      ));
      if (!key) {
        return res.send(createError(404, `Key ${key} not found`));
      }
      const keyID = key.key_id;
      const hash = await bcrypt.hash(req.body.password, SALT_ROUNDS);
      const userId: number = first(
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
      ) || 1;
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
