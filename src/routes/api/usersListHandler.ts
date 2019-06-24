import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import User from "../../models/User";
import { db } from "../../services";

const usersListHandler = async (req: Request, res: Response, next: NextFunction) => {
  const users: IUser[] = (await db("users").select()).map((user: IUser) => new User(user));
  if (users) {
    res.json({
      users: users.map((user) => user.insecureData()),
    });
  } else {
    next(createError(404, `Users not found`));
  }
};

export default usersListHandler;
