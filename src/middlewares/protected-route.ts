import { NextFunction, Request, Response } from "express";
import createError from "http-errors";

function protectedRoute(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated()) {
    res.send(createError(401, "Not Authorized to access endpoint"));
    return;
  }
  next();
}

export default protectedRoute;
