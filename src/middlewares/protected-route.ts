import * as createError from "http-errors";
module.exports = function protectedRoute(req, res, next) {
  if (!req.isAuthenticated()) {
    res.send(createError(401, "Not Authorized to access enpoint"));
    return;
  }
  next();
};
