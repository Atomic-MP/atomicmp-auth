import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import first from "lodash.first";
import { IFaction } from "../../models/Faction";
import User, { IUser } from "../../models/User";
import { db } from "../../services";

// Include things like position, hunger and inventory of allies
const secureData = (users: IUser[]) => users.map(
  (user) => ({
    discord_id: user.discord_id,
    inventory: user.inventory,
    nickname: user.nickname,
    rotation: user.rotation,
    user_id: user.user_id,
    username: user.username,
    x_pos: user.x_pos,
    y_pos: user.y_pos,
    z_pos: user.z_pos,
  }),
);

const insecureData = (users: IUser[]) => users.map(
  (user) => ({
    discord_id: user.discord_id,
    nickname: user.nickname,
    user_id: user.user_id,
    username: user.username,
  }),
);

const factionInfoHandler = async (req: Request, res: Response, next: NextFunction) => {
  const targetFactionID = req.params.id;
  const faction: (IFaction | undefined) = first(await db("factions").where("faction_id", targetFactionID));
  if (faction) {
    const usersData: IUser[] = (await db("users").where("faction", targetFactionID))
      .map((user: IUser) => new User(user));

    // Members of this faction should get more data
    const users = faction.faction_id === req.user.faction
      ? usersData.map((user) => user.secureData())
      : usersData.map((user) => user.insecureData());

    faction.users = users;
    res.json(faction);
  } else {
    next(createError(404, `Faction ${targetFactionID} not found`));
  }
};

export default factionInfoHandler;
