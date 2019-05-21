import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.cookie("jwt", "");
  req.logout();
  res.redirect("/");
});

export default router;
