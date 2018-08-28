const express = require('express')
const router = express.Router()
const isEmpty = require('lodash.isempty')
const first = require('lodash.first')
const db = require('../utils/database')
const passport = require('../middlewares/passport')
const bcrypt = require('bcrypt')
const { brand, slogan, saltRounds } = require('../constants')
/*
Model for valid signup credentials.
*/
const isValidSignupCredentials = payload => {
  const validUsernameRegex = /^([a-zA-Z ]){3,24}$/
  const validPasswordRegex = /^([A-Za-z\d$@$!%*?&]){8,50}$/
  return (
    payload.username &&
    payload.password &&
    payload.confirmPassword &&
    payload.key &&
    payload.password === payload.confirmPassword &&
    payload.username.replace(/ /g, '').length >= 3 &&
    !payload.username.startsWith(' ') &&
    validUsernameRegex.test(payload.username) &&
    validPasswordRegex.test(payload.password)
  )
}

router.get('/', (req, res) => {
  let user
  if (req.isAuthenticated()) {
    user = req.user
  }
  res.render('index.pug', {
    title: brand + ' - ' + slogan,
    user: user
  })
})

router.route('/login')
  .get((req, res) => {
    let user
    if (req.isAuthenticated()) {
      user = req.user
    }
    res.render('login.pug', {
      title: brand + ' - ' + slogan,
      user: user
    })
  })
  .post(passport.authenticate('local'), (req, res) => {
    res.sendStatus(200)
  })

router.route('/register')
  .get((req, res) => {
    let user
    if (req.isAuthenticated()) {
      user = req.user
    }
    res.render('register.pug', {
      title: brand + ' - ' + slogan,
      user: user
    })
  })
  .post(async (req, res, next) => {
    if (!req.body || !req.body.username || !req.body.password) return res.sendStatus(400)
    req.body.username = req.body.username.trim()
    if (isValidSignupCredentials(req.body)) {
      var username = req.body.username
      // Check if username exists; case insensitive
      const usernameExists = !isEmpty(await db.raw(`SELECT * FROM users WHERE LOWER(username)=LOWER('${req.body.username}')`).rows)
      if (usernameExists) {
        console.log(`User ${username} already exists`)
        return res.sendStatus(409)
      }
      const key = first(await db('keys').select('key_id', 'discord_id')
        .where('key', req.body.key)
        .andWhere('owner', null))
      if (!key) {
        return res.sendStatus(409)
      }
      const keyID = key.key_id
      const hash = await bcrypt.hash(req.body.password, saltRounds)
      const ownerId = first(await db('users')
        .returning('user_id')
        .insert({
          username,
          hash,
          role: 3,
          faction: null,
          discord_id: key.discord_id,
          created_at: new Date()
        }))
      await db('keys')
        .where('key_id', keyID)
        .update('owner', ownerId)
      res.redirect('/')
    }
  })

router.get('/user/:id', async (req, res) => {
  if (req.isAuthenticated()) {
    var user = req.user
    var targetUserID = req.params.id
    const targetUser = first(await db('users')
      .join('roles', 'users.role', '=', 'roles.role_id')
      .select('user_id', 'username', 'role_name', 'faction', 'created_at')
      .where('user_id', targetUserID))

    res.render('user.pug', {
      title: brand + ' - ' + slogan,
      user: user,
      targetUser
    })
  } else {
    res.redirect('/')
  }
})

router.get('/logout', (req, res) => {
  req.session.destroy()
  req.logout()
  res.redirect('/')
})

router.get('/download', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('http://www.mediafire.com/file/8x1l3pl4bp6agpl/WindowsNoEditor.zip')
  }
})

router.use((req, res) => {
  res.redirect('/')
})

module.exports = router
