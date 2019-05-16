import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import first from "lodash.first";
import { IFaction } from "../../models/Faction";
import { db } from "../../services";

const factionLookupHandler = async (req: Request, res: Response, next: NextFunction) => {
  const targetFactionID = req.params.id;
  const faction: (IFaction | undefined) = first(await db("factions").where("faction_id", targetFactionID));
  if (faction) {
    res.json(faction);
  } else {
    next(createError(404, `Faction ${targetFactionID} not found`));
  }
};

export default factionLookupHandler;
