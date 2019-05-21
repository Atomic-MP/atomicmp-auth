import { NextFunction, Request, Response } from "express";
import hexRgb from "hex-rgb";
import first from "lodash.first";
import { IFaction } from "../../models/Faction";
import { db, logger } from "../../services";

const loadHandler = async (req: Request, res: Response, next: NextFunction) => {
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
    const factionColor = await db("factions")
      .first("color")
      .where(
        "faction_id",
        user.faction,
      ) as (IFaction["color"] | undefined);

    // tslint:disable-next-line: variable-name
    const [faction_color_r, faction_color_g, faction_color_b] = hexRgb(
      (factionColor) ? factionColor : "#FFFFFF",
      { format: "array" },
    );

    user.faction_color_r = faction_color_r;
    user.faction_color_g = faction_color_g;
    user.faction_color_b = faction_color_b;
  }
  res.json(user);
};

export default loadHandler;
