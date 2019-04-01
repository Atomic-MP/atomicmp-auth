import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { logger } from "../services";
import jwtAuthentication from "./jwt-authentication";

function jwtMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log(req)
  jwtAuthentication.authenticate("jwt", (err: Error, user) => {
    if (err) {
      logger.error(err);
      res.sendStatus(503);
      return;
    }
    if (user) {
      req.user = new User(user);
    }

    next();
  })(req, res);
}

export default jwtMiddleware;
