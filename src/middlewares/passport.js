
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const first = require('lodash.first')
const db = require('../utils/database')
const bcrypt = require('bcrypt')

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
},
async (username, password, done) => {
  const user = first(await db('users')
    .select()
    .where('username', username))
      // User not found
  if (!user) {
    return done(null, false)
  }
  // Always use hashed passwords and fixed time comparison
  bcrypt.compare(password, user.hash.toString('utf-8'), (err, isValid) => {
    if (err) return done(err)
    return ((!isValid) ? done(null, false) : done(null, user))
  })
}))

passport.serializeUser(async (user, done) => {
  await db('users')
    .where('user_id', user.user_id)
    .update('last_seen', new Date())
  done(null, user.user_id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = first(await db('users').select().where('user_id', id))
    done(null, user)
  } catch (err) {
    done(new Error(`User with the id ${id} does not exist`))
  }
})

module.exports = passport
