import { Router } from "express";
import createError from "http-errors";
import first from "lodash.first";

import User from "../models/User";
import { db, logger } from "../services";
import { TITLE } from "../utils/constants";

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

router.get("/", (req, res) => {
  let user;
  if (req.isAuthenticated()) {
    user = req.user;
  }
  res.render("index.pug", {
    TITLE,
    user,
  });
});

router.get("/user/:id", async (req, res) => {
  if (req.isAuthenticated()) {
    const user: User = req.user;
    const targetUserID = req.params.id;
    const targetUser: User | undefined = first(await db("users")
      .join("roles", "users.role", "=", "roles.role_id")
      .select("user_id", "username", "role_name", "faction", "created_at")
      .where("user_id", targetUserID));

    res.render("user.pug", {
      TITLE,
      targetUser,
      user,
    });
  } else {
    res.redirect("/");
  }
});

router.get("/faction/:id", async (req, res) => {
  if (req.isAuthenticated()) {
    const user: User = req.user;
    const targetFactionID: number = req.params.id;
    const faction = first(await db("factions").where("faction_id", targetFactionID));
    if (faction) {
      logger.info(faction);
      res.render("faction.pug", {
        TITLE,
        faction,
        user,
      });
    } else {
      res.send(createError(404, "Faction not found"));
    }
  } else {
    res.redirect("/");
  }
});

router.use((req, res) => {
  res.redirect("/");
});

export default router;
