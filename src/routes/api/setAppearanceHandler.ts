import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import Appearance from "../../models/Appearance";
import { db, logger } from "../../services";

const setAppearanceHandler = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  try {
    const appearance = new Appearance(req.body);
    logger.info("[APPE] " + JSON.stringify(appearance));
    const { nickname, head, hair, hair_color, is_male } = appearance;

    await db("users")
      .where("user_id", user.user_id)
      .update({
        hair,
        hair_color,
        head,
        is_male,
        nickname,
      });
    res.sendStatus(200);
  } catch (error) {
    logger.error("[SET-APPEARANCE][ERROR] " + error.message);
    next(createError(400, error.message));
  }
};

export default setAppearanceHandler;
