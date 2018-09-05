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
        return done(null, false);
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
