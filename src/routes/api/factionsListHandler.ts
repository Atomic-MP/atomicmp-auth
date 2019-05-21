import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { IFaction } from "../../models/Faction";
import { db } from "../../services";

const factionInfoHandler = async (req: Request, res: Response, next: NextFunction) => {
  const factions: IFaction[] = await db("factions").select();
  if (factions) {
    res.json({
      factions,
    });
  } else {
    next(createError(404, `Factions not found`));
  }
};

export default factionInfoHandler;
