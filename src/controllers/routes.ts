import { Router } from "express";

import apiRoutes from "./api";
import loginRoutes from "./login";
import logoutRoutes from "./logout";
import recoveryRoutes from "./recovery";
import registerRoutes from "./register";

const router = Router();

router.use("/api", apiRoutes);
router.use("/login", loginRoutes);
router.use("/logout", logoutRoutes);
router.use("/register", registerRoutes);
router.use("/recovery", recoveryRoutes);

router.get("/me", async (req, res) => {
  res.send(req.user);
});

router.get("/ping", async (req, res) => {
  res.status(200).send("pong!");
});

router.get("/", (req, res) => {
  res.status(301).redirect("https://www.atomicmp.com");
});

router.use((req, res) => {
  res.redirect("/");
});

export default router;
