import { Router } from "express";

import apiRoutes from "./api";
import loginRoutes from "./login";
import logoutRoutes from "./logout";
import meRoutes from "./me";
import recoveryRoutes from "./recovery";
import registerRoutes from "./register";

import { NotFound } from "http-errors";

const router = Router();

router.use("/api", apiRoutes);
router.use("/login", loginRoutes);
router.use("/logout", logoutRoutes);
router.use("/register", registerRoutes);
router.use("/recovery", recoveryRoutes);

router.use("/me", meRoutes);

router.get("/ping", async (req, res) => {
  res.status(200).send("pong!");
});

router.get("/", (req, res) => {
  res.status(301).redirect("https://www.atomicmp.com");
});

router.all("*", async (req, res, next) => {
  next(new NotFound("test"));
});

export default router;
