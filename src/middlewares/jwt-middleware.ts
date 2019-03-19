import { logger } from "../services";
import { default as jwtAuthentication } from "./jwt-authentication";

function jwtMiddleware(req, res, next) {
  jwtAuthentication.authenticate("jwt", (err, user) => {
    if (err) {
      logger.error(err);
      res.sendStatus(503);
      return;
    }
    req.user = user;

    next();
  })(req, res);
}

export default jwtMiddleware;
