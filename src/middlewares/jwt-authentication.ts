import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from "passport-jwt";
import { db } from "../services";

const JWT_SECRET = process.env.JWT_SECRET || "";

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req) => {
      if (req.cookies) {
        return req.cookies.jwt || "";
      }
      return "";
    },
  ]),
  secretOrKey: JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, async (jwtPayload: {userId: string}, done) => {
    try {
      const targetUserID: string = jwtPayload.userId;
      const [user] = await db("users").where("user_id", targetUserID);

      if (user) {
        const userData = Object.assign({}, user);
        // None of our views or APIs will require user hashes... Removing for security
        // Consider abstracting hashes to a different table.
        delete userData.hash;
        if (user.inventory) {
          userData.inventory = user.inventory;
        }
        return done(null, userData);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  }),
);

export default passport;