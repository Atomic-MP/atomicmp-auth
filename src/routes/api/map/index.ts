import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { isModerator } from "../../../helpers";
import User, { IUser } from "../../../models/User";
import { db } from "../../../services";

const mapDataHandler = async (req: Request, res: Response, next: NextFunction) => {

  const users: IUser[] = (await db("users").select())
    .filter((user: IUser) => {
      return (user.x_pos != null && user.y_pos != null && user.rotation != null) &&
      (
        isModerator(req.user.role) ||
        (req.user.faction && req.user.faction === user.faction)
      );
    })
    .map((user: IUser) => new User(user));
  if (users) {
    res.json({
      users: users.map(({
        faction,
        rotation,
        user_id,
        username,
        x_pos,
        y_pos,
      }) => ({
        faction,
        rotation,
        user_id,
        username,
        x_pos,
        y_pos,
      })),
    });
  } else {
    next(createError(404, `Users not found`));
  }
};

export default mapDataHandler;
