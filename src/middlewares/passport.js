
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const db = require('../utils/database')
const bcrypt = require('bcrypt')

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
},
(username, password, done) => {
  db('users')
    .select()
    .where('username', username).then(rows => {
      let user = rows[0]
      // User not found
      if (!user) {
        return done(null, false)
      }
      // Always use hashed passwords and fixed time comparison
      bcrypt.compare(password, user.hash.toString('utf-8'), (err, isValid) => {
        if (err) return done(err)
        return ((!isValid) ? done(null, false) : done(null, user))
      })
    })
}
))

passport.serializeUser((user, done) => {
  db('users')
    .where('user_id', user.user_id)
    .update('last_seen', new Date()).then(() => {
      done(null, user.user_id)
    })
})

passport.deserializeUser((id, done) => {
  db('users').select().where('user_id', id)
    .then(data => {
      let user = data[0]
      // log.debug("deserializeUser ", user);
      done(null, user)
    })
    .catch(() => {
      done(new Error(`User with the id ${id} does not exist`))
    })
})

module.exports = passport
