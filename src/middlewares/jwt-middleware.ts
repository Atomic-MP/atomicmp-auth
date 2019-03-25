import { NextFunction, Request, Response } from "express";
import { logger } from "../services";
import jwtAuthentication from "./jwt-authentication";

function jwtMiddleware(req: Request, res: Response, next: NextFunction) {
  jwtAuthentication.authenticate("jwt", (err: Error, user) => {
    if (err) {
      logger.error(err);
      res.sendStatus(503);
      return;
    }
    req.user = user;

    next();
  })(req, res);
}

export default jwtMiddleware;
