import { Router } from "express";
import protectedRoute from "../../middlewares/protected-route";
import factionInfoHandler from "./factionInfoHandler";
import factionsListHandler from "./factionsListHandler";
import loadHandler from "./loadHandler";
import saveHandler from "./saveHandler";
import setAppearanceHandler from "./setAppearanceHandler";
import userRouter from "./user";
import usersListHandler from "./usersListHandler";

const router = Router();
router.use("/user", userRouter);
router.get("/users", usersListHandler);
router.get("/faction/:id", factionInfoHandler);
router.get("/factions", factionsListHandler);
router.use(protectedRoute);

router.put("/save", saveHandler);
router.get("/load", loadHandler);

router.put("/set-appearance", setAppearanceHandler);

export default router;
