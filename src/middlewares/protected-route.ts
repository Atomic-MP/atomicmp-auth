import { NextFunction, Request, Response } from "express";
import createError from "http-errors";

function protectedRoute(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated()) {
    const err = createError(401, "Not Authorized to access endpoint");
    res.status(err.statusCode).send(err);
    return;
  }
  next();
}

export default protectedRoute;
