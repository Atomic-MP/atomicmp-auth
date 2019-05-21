import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import first from "lodash.first";
import { IFaction } from "../../models/Faction";
import User, { IUser } from "../../models/User";
import { db } from "../../services";

const factionInfoHandler = async (req: Request, res: Response, next: NextFunction) => {
  const targetFactionID = req.params.id;
  const faction = await db("factions").first().where("faction_id", targetFactionID) as (IFaction | undefined);
  if (faction) {
    const usersData: IUser[] = (await db("users").where("faction", targetFactionID))
      .map((user: IUser) => new User(user));

    // Members of this faction should get more data
    const users = req.user && faction.faction_id === req.user.faction
      ? usersData.map((user) => user.secureData())
      : usersData.map((user) => user.insecureData());

    faction.users = users;
    res.json(faction);
  } else {
    next(createError(404, `Faction ${targetFactionID} not found`));
  }
};

export default factionInfoHandler;
