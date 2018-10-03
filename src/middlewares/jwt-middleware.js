const jwtAuthentication = require('./jwt-authentication');
const { logger } = require('../services');

function jwtMiddleware(req, res, next) {
  jwtAuthentication.authenticate('jwt', (err, user) => {
    if (err) {
      logger.error(err);
      res.sendStatus(503);
      return;
    }
    req.user = user;

    next();
  })(req, res);
}

module.exports = jwtMiddleware;
