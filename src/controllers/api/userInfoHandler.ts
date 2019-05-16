import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import first from "lodash.first";
import User from "../../models/User";
import { db } from "../../services";

const userInfoHandler = async (req: Request, res: Response, next: NextFunction) => {
  const targetUserID = req.params.id;
  const targetUser: User | undefined = first(await db("users")
    .where("user_id", targetUserID)
    .select("username", "health", "discord_id"));
  if (targetUser) {
    res.json(targetUser);
  } else {
    next(createError(404, `User ${targetUserID} not found`));
  }
};

export default userInfoHandler;
