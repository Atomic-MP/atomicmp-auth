import { Router } from "express";
import protectedRoute from "../../middlewares/protected-route";
import factionLookupHandler from "./factionLookupHandler";
import loadHandler from "./loadHandler";
import saveHandler from "./saveHandler";
import setAppearanceHandler from "./setAppearanceHandler";
import userInfoHandler from "./userInfoHandler";
const router = Router();
router.use(protectedRoute);

router.put("/save", saveHandler);
router.get("/load", loadHandler);

router.put("/set-appearance", setAppearanceHandler);

router.get("/user-info/:id", userInfoHandler);
router.get("/faction-info/:id", factionLookupHandler);

export default router;
