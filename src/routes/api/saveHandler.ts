import { NextFunction, Request, Response } from "express";
import SaveData from "../../models/SaveData";
import { db, logger } from "../../services";

const saveHandler = async (req: Request, res: Response, next: NextFunction) => {
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
      last_seen: new Date(),
      rotation,
      thirst,
      x_pos,
      y_pos,
      z_pos,
    });

  logger.info("[SAVE]", JSON.stringify(saveData));
  res.sendStatus(200);
};

export default saveHandler;
