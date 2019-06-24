import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import User from "../../../models/User";
import { db } from "../../../services";

const getUserAppearance = async (req: Request, res: Response, next: NextFunction) => {
  const targetUserID = req.params.id;
  const targetUser = await db("users")
    .where("user_id", targetUserID)
    .first("head", "hair", "hair_color", "is_male", "nickname") as (User | undefined);
  if (targetUser) {
    res.json({
      hair: targetUser.hair,
      hair_color: targetUser.hair_color,
      head: targetUser.head,
      is_male: targetUser.is_male,
      nickname: targetUser.nickname,
    });
  } else {
    next(createError(404, `User ${targetUserID} not found`));
  }
};

export default getUserAppearance;
