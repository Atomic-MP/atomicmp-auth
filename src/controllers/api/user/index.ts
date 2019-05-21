import { Router } from "express";
import getUserAppearance from "./getUserAppearance";
import getUserInfoHandler from "./getUserInfoHandler";
import getUserInventory from "./getUserInventory";
import getUserLocation from "./getUserLocation";

const router = Router();

router.get("/:id", getUserInfoHandler);
router.get("/:id/inventory", getUserInventory);
router.get("/:id/location", getUserLocation);
router.get("/:id/appearance", getUserAppearance);

export default router;
