import { Router } from "express";
import hexRgb from "hex-rgb";
import createError from "http-errors";
import first from "lodash.first";
import protectedRoute from "../../middlewares/protected-route";
import Appearance from "../../models/Appearance";
import { IFaction } from "../../models/Faction";
import SaveData from "../../models/SaveData";
import User from "../../models/User";
import { db, logger } from "../../services";
const router = Router();
router.use(protectedRoute);

router.put("/save", async (req, res, next) => {
  const user = req.user;
  const saveData = new SaveData(req.body);
  const {
    health,
    hunger,
    thirst,
    x_pos,
    y_pos,
    z_pos,
    rotation,
    inventory,
  } = saveData;

  logger.info(`inventory: ${JSON.stringify(inventory)}`);

  await db("users")
    .where("user_id", user.user_id)
    .update({
      health,
      hunger,
      inventory: JSON.stringify(inventory),
      rotation,
      thirst,
      x_pos,
      y_pos,
      z_pos,
    });

  logger.info("[SAVE]", JSON.stringify(saveData));
  res.sendStatus(200);
});

router.put("/set-appearance", async (req, res, next) => {
  const user = req.user;

  try {
    const appearance = new Appearance(req.body);
    logger.info("[APPE] " + JSON.stringify(appearance));
    const { nickname, head, hair, hair_color, is_male } = appearance;

    await db("users")
      .where("user_id", user.user_id)
      .update({
        hair,
        hair_color,
        head,
        is_male,
        nickname,
      });
    res.sendStatus(200);
  } catch (error) {
    logger.error("[SET-APPEARANCE][ERROR] " + error.message);
    next(createError(400, error.message));
  }
});

router.get("/user-info/:id", async (req, res, next) => {
  const targetUserID = req.params.id;
  const targetUser: User | undefined = first(await db("users")
    .where("user_id", targetUserID)
    .select("username", "health", "discord_id"));
  if (targetUser) {
    res.json(targetUser);
  } else {
    next(createError(404, `User ${targetUserID} not found`));
  }
});
router.get("/faction-info/:id", async (req, res, next) => {
  const targetFactionID = req.params.id;
  const faction: (IFaction | undefined) = first(await db("factions").where("faction_id", targetFactionID));
  if (faction) {
    res.json(faction);
  } else {
    next(createError(404, `Faction ${targetFactionID} not found`));
  }
});

router.get("/load", async (req, res, next) => {
  // Explicitly defining the data points that should be
  // set to the client on load
  const savestateKeys = new Set([
    "user_id",
    "username",
    "role",
    "faction",
    "health",
    "hunger",
    "thirst",
    "head",
    "hair",
    "hair_color",
    "is_male",
    "nickname",
    "x_pos",
    "y_pos",
    "z_pos",
    "rotation",
    "inventory",
  ]);

  const user = req.user;
  for (const key of Object.keys(user)) {
    if (!savestateKeys.has(key)) { delete user[key]; }
  }

  logger.info("[LOAD] " + JSON.stringify(user));

  if (user.faction) {
    const factionData: (IFaction | undefined) = first(await db("factions").where(
      "faction_id",
      user.faction,
    ));

    // tslint:disable-next-line: variable-name
    const [faction_color_r, faction_color_g, faction_color_b] = hexRgb(
      (factionData === undefined) ? "#FFFFFF" : factionData.color,
      {
        format: "array",
      },
    );

    user.faction_color_r = faction_color_r;
    user.faction_color_g = faction_color_g;
    user.faction_color_b = faction_color_b;
  }
  res.json(user);
});

export default router;
