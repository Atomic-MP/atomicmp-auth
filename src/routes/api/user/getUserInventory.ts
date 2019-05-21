import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import first from "lodash.first";
import User from "../../../models/User";
import { db } from "../../../services";

const getUserInventory = async (req: Request, res: Response, next: NextFunction) => {
  const targetUserID = req.params.id;
  const targetUser = await db("users")
    .where("user_id", targetUserID)
    .first("inventory", "user_id", "faction") as (User | undefined);
  if (targetUser) {

    if (req.user &&
      (targetUser.user_id === req.user.id
    || targetUser.faction && targetUser.faction === req.user.faction)) {
      res.json({inventory: targetUser.inventory});
    } else {
      next(createError(401, `Cannot access User ${targetUserID}'s inventory`));
    }
  } else {
    next(createError(404, `User ${targetUserID} not found`));
  }
};

export default getUserInventory;
