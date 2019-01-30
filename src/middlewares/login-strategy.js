const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const first = require('lodash.first');
const db = require('../services/database');
const bcrypt = require('bcrypt');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username, password, done) => {
      const user = first(
        await db('users')
          .select()
          .where('username', username)
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
          'User is banned! If you believe this to be an error, contact staff.',
          false
        );
      }

      // Always use hashed passwords and fixed time comparison
      bcrypt.compare(password, user.hash.toString('utf-8'), (err, isValid) => {
        if (err) return done(err);
        return done(null, !isValid ? null : user);
      });
    }
  )
);

module.exports = passport;
