import { Router } from "express";
import { NotFound } from "http-errors";

const router = Router();

router.get("/", async (req, res, next) => {
  if (!req.user) {
    return next(new NotFound("No user found. Did you include a token?"));
  }
  res.send(req.user);
});

export default router;
