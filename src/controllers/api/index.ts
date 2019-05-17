import { Router } from "express";
import protectedRoute from "../../middlewares/protected-route";
import factionInfoHandler from "./factionInfoHandler";
import factionsListHandler from "./factionsListHandler";
import loadHandler from "./loadHandler";
import saveHandler from "./saveHandler";
import setAppearanceHandler from "./setAppearanceHandler";
import userInfoHandler from "./userInfoHandler";
const router = Router();
router.use(protectedRoute);

router.put("/save", saveHandler);
router.get("/load", loadHandler);

router.put("/set-appearance", setAppearanceHandler);

router.get("/user/:id", userInfoHandler);
router.get("/faction/:id", factionInfoHandler);
router.get("/factions", factionsListHandler);

export default router;
