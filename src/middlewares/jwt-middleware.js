const jwtAuthentication = require('./jwt-authentication');

function jwtMiddleware(req, res, next) {
  jwtAuthentication.authenticate('jwt', (err, user, info) => {
    if (err) {
      console.log(err)
      res.sendStatus(503);
      return;
    }
    req.user = user;

    next();
  })(req, res);
}

module.exports = jwtMiddleware;
