import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import first from "lodash.first";
import User from "../../../models/User";
import { db } from "../../../services";

const getUserLocation = async (req: Request, res: Response, next: NextFunction) => {
  const targetUserID = req.params.id;
  const targetUser = await db("users")
    .where("user_id", targetUserID)
    .first("x_pos", "y_pos", "z_pos", "rotation", "user_id", "faction") as (User | undefined);
  if (targetUser) {
    if (req.user &&
      ( targetUser.user_id === req.user.id ||
        targetUser.faction && targetUser.faction === req.user.faction)) {
      res.json({
        rotation: targetUser.rotation,
        x_pos: targetUser.x_pos,
        y_pos: targetUser.y_pos,
        z_pos: targetUser.z_pos,
      });
    } else {
      next(createError(401, `Cannot access User ${targetUserID}'s location`));
    }
  } else {
    next(createError(404, `User ${targetUserID} not found`));
  }
};

export default getUserLocation;
