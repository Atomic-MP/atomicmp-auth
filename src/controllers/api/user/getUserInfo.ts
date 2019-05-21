import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import first from "lodash.first";
import User from "../../../models/User";
import { db } from "../../../services";

const getUserInfoHandler = async (req: Request, res: Response, next: NextFunction) => {
  const targetUserID = req.params.id;
  const targetUser: User | undefined = first(await db("users")
    .where("user_id", targetUserID));
  if (targetUser) {
    const user = new User(targetUser);

    // Requester isn't logged in. Send insecure data
    if (!req.user) {
      return res.json(user.insecureData());
    }

    if (user.user_id === req.user.id || (user.faction && user.faction === req.user.faction)) {
      res.json(user.secureData());
    } else {
      res.json(user.insecureData());
    }
  } else {
    next(createError(404, `User ${targetUserID} not found`));
  }
};

export default getUserInfoHandler;
