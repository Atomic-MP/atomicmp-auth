import bcrypt from "bcrypt";
import first from "lodash.first";
import * as passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { db } from "../services";

passport.use(
  new LocalStrategy(
    {
      passwordField: "password",
      usernameField: "username",
    },
    async (username: string, password: string, done) => {
      const user = first(
        await db("users")
          .select()
          .where("username", username),
      );
      // User not found
      if (!user) {
        // Do not send specific error to prevent user enumeration
        return done(null, false);
      }

      // User is banned or kicked
      if (user.role === 1 || user.role === 2) {
        // Send informative error message in this case
        return done(
          "User is banned! If you believe this to be an error, contact staff.",
          false,
        );
      }

      // Always use hashed passwords and fixed time comparison
      bcrypt.compare(password, user.hash.toString("utf-8"), (err: Error, isValid: boolean) => {
        if (err) {
          return done(err);
        }
        return done(null, !isValid ? null : user);
      });
    },
  ),
);

export default passport;
