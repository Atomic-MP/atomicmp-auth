import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from "passport-jwt";
import User from "../models/User";
import { db } from "../services";

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
      const userData: IUser | undefined = await db("users")
        .first()
        .where("user_id", targetUserID);

      return done(null, userData ? new User(userData) : false);
    } catch (err) {
      return done(err, false);
    }
  }),
);

export default passport;
