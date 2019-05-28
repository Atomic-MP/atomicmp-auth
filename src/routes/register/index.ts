import bcrypt from "bcrypt";
import { Router } from "express";
import createError from "http-errors";
import jwt from "jsonwebtoken";
import first from "lodash.first";
import isEmpty from "lodash.isempty";
import { isValidSignupCredentials } from "../../helpers";
import IRegistrationPayload from "../../models/IRegistrationPayload";
import Key from "../../models/Key";
import { db, logger } from "../../services";
import { SALT_ROUNDS } from "../../utils/constants";

const JWT_SECRET = process.env.JWT_SECRET || "";

const router = Router();

router
  .post("/", async (req, res, next) => {

    if (!isValidSignupCredentials(req.body)) {
      return next(createError(400, "Malformed registration payload"));
    }

    const {username: usernameUnparsed, password, key} = req.body as IRegistrationPayload;

    const username = usernameUnparsed.trim();
    // Check if username exists; case insensitive

    const usernameExists: boolean = !isEmpty(
      (await db.raw(
        `SELECT * FROM users WHERE LOWER(username)=LOWER('${username}')`,
      )).rows,
    );
    if (usernameExists) {
      logger.warn(`User ${username} already exists`);
      return next(createError(409, `User ${username} already exists`));
    }
    const keyData = first(
      await db("keys")
        .select("key_id", "discord_id")
        .where("key", key)
        .andWhere("owner", null),
    ) as (Key | undefined);
    if (!keyData) {
      return next(createError(404, `Key ${key} not found`));
    }
    const { key_id, discord_id } = keyData;
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const userId: number = first(
      await db("users")
        .returning("user_id")
        .insert({
          created_at: new Date(),
          discord_id,
          faction: null,
          hash,
          health: 100,
          hunger: 100,
          role: 3,
          rotation: 0,
          thirst: 100,
          username,
          x_pos: 69449.953125,
          y_pos: -26285.0,
        }),
    ) as number;
    await db("keys")
      .where("key_id", key_id)
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
  });

export default router;
