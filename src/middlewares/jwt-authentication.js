const first = require('lodash.first');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('../services/database');

const { JWT_SECRET } = process.env;

const opts = {};
opts.secretOrKey = JWT_SECRET;
opts.jwtFromRequest = ExtractJwt.fromExtractors([
  req => {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies['jwt'];
    }
    return token;
  },
]);

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const targetUserID = jwt_payload.userId;
      const data = first(await db('users').where('user_id', targetUserID));

      if (data) {
        return done(null, data);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

module.exports = passport;
