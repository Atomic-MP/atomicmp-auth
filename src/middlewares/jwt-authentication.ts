import first from "lodash.first";
import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from "passport-jwt";
import User from "../models/User";
import { db, logger } from "../services";

const JWT_SECRET = process.env.NODE_ENV === "test"
  ? "test"
  : process.env.JWT_SECRET;

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET as string,
};

passport.use(
  new JwtStrategy(opts, async (jwtPayload: {userId: string}, done) => {
    try {
      const targetUserID: string = jwtPayload.userId;
      const user: User | undefined = first(await db("users").where("user_id", targetUserID));
      if (user) {
        const userData = Object.assign({}, user);
        delete userData.hash;
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
