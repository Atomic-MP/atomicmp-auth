import * as passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { db } from '../services';

const { JWT_SECRET } = process.env;

const opts: object = {
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromExtractors([
    req => {
      let token = null;
      if (req && req.cookies) {
        token = req.cookies.jwt;
      }
      return token;
    },
  ]),
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const targetUserID = jwt_payload.userId;
      const [user] = await db('users').where('user_id', targetUserID);

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
  })
);

export default passport;
