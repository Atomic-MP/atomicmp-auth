import { Router } from "express";
import hexRgb from "hex-rgb";
import createError from "http-errors";
import first from "lodash.first";
import protectedRoute from "../../middlewares/protected-route";
import Appearance from "../../models/Appearance";
import SaveData from "../../models/SaveData";
import User from "../../models/User";
import { db, logger } from "../../services";
const router = Router();
router.use(protectedRoute);

/**
 * This is a sample of the user data output from user data dump
 */
router.get("/sample-user-data", (req, res) => {
  res.json({
    female_hair: 1,
    female_head: 1,
    hair_color: 1,
    health: Math.floor(Math.random() * 100 + 1),
    hunger: 55.43,
    is_admin: false,
    is_male: true,
    male_hair: 1,
    male_head: 1,
    money: 587,
    thirst: 55.43,
    user_id: 1,
    x_pos: 100,
    y_pos: -201.54,
    z_pos: 350,
  });
});

router.put("/save", async (req, res) => {
  const user: User = req.user;
  const {
    health,
    hunger,
    thirst,
    x_pos,
    y_pos,
    z_pos,
    inventory,
    money,
  } = new SaveData(req.body);

  logger.info(`inventory: ${JSON.stringify(inventory)}, money: ${money}`);

  await db("users")
    .where("user_id", user.user_id)
    .update({
      health,
      hunger,
      inventory: JSON.stringify(inventory),
      money,
      thirst,
      x_pos,
      y_pos,
      z_pos,
    });

  logger.info(`${user.username} data saved:
  ${JSON.stringify(inventory)}
  ${money}
  `);
  res.sendStatus(200);
});

router.put("/set-appearance", async (req, res) => {
  const user: User = req.user;

  try {
    const { nickname, head, hair, hair_color, is_male } = new Appearance(req.body);

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
  } catch (e) {
    logger.error("[SET-APPEARANCE][ERROR] " + e.message);
    res.send(createError(400, e.message));
  }
});

router.get("/user-info/:id", async (req, res) => {
  const targetUserID = req.params.id;
  const user: User | undefined = first(await db("users")
    .where("user_id", targetUserID)
    .select("username", "health", "discord_id"));
  if (user) {
    res.json(user);
  } else {
    res.send(createError(404, `User ${targetUserID} not found`));
  }
});
router.get("/faction-info/:id", async (req, res) => {
  const targetFactionID = req.params.id;
  const [faction] = await db("factions").where("faction_id", targetFactionID);
  if (faction) {
    res.json(faction);
  } else {
    res.send(createError(404, `Faction ${targetFactionID} not found`));
  }
});

router.get("/load", async (req, res) => {
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
    "inventory",
    "money",
  ]);

  const user = req.user;
  for (const key of Object.keys(user)) {
    if (!savestateKeys.has(key)) { delete user[key]; }
  }

  user.inventory = (Array.isArray(user.inventory)) ? user.inventory : [];

  if (user.faction) {
    const [factionData] = await db("factions").where(
      "faction_id",
      user.faction,
    );
    // tslint:disable-next-line: variable-name
    const [faction_color_r, faction_color_g, faction_color_b] = hexRgb(
      factionData.color || "#FFFFFF",
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
