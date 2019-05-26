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
        // Moderator+ should get all available user data
        isModerator(req.user.role) ||
        // Users should recieve the data of fellow faction members
        (req.user.faction && req.user.faction === user.faction)
      );
    })
    .map((user: IUser) => new User(user));
  if (users) {
    res.json({
      player: {
        rotation: req.user.rotation,
        x_pos: req.user.x_pos,
        y_pos: req.user.y_pos,
      },
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
