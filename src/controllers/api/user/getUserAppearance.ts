import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import first from "lodash.first";
import User from "../../../models/User";
import { db } from "../../../services";

const getUserAppearance = async (req: Request, res: Response, next: NextFunction) => {
  const targetUserID = req.params.id;
  const targetUser: User | undefined = first(await db("users")
    .where("user_id", targetUserID)
    .select("head", "hair", "hair_color", "is_male", "nickname"));
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
