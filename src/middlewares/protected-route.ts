import createError from "http-errors";

function protectedRoute(req, res, next) {
  if (!req.isAuthenticated()) {
    res.send(createError(401, "Not Authorized to access enpoint"));
    return;
  }
  next();
}

export default protectedRoute;
