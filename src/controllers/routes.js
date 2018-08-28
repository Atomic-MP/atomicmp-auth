const express = require('express')
const router = express.Router()
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
  .post((req, res, next) => {
    if (!req.body || !req.body.username || !req.body.password) return res.sendStatus(400)
    req.body.username = req.body.username.trim()
    if (isValidSignupCredentials(req.body)) {
      var username = req.body.username
      // Check if username exists; case insensitive
      db.raw(`SELECT * FROM users WHERE LOWER(username)=LOWER('${req.body.username}')`).then(data => {
        let rows = data.rows
        if (rows.length > 0) {
          console.log(`User ${rows[0].username} already exists`)
          res.sendStatus(409)
        } else {
          db('keys').select('key_id', 'discord_id')
            .where('key', req.body.key)
            .andWhere('owner', null)
            .then(data => {
              if (data.length > 0) {
                const keyID = data[0].key_id
                bcrypt.hash(req.body.password, saltRounds).then(hash => {
                  // Store this in the DB
                  // const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress

                  db('users')
                    .returning('user_id')
                    .insert({
                      username,
                      hash,
                      role: 3,
                      faction: null,
                      discord_id: data[0].discord_id,
                      created_at: new Date()
                    })
                    .then(returning => {
                      db('keys')
                        .where('key_id', keyID)
                        .update('owner', returning[0])
                        .then(() => {
                          res.redirect('/')
                        })
                    })
                    .catch(err => {
                      console.log(err)
                    })
                })
              } else {
                res.sendStatus(409)
              }
            })
        }
      })
    } else {
      res.sendStatus(400)
      res.end()
    }
  })

router.get('/user/:id', (req, res) => {
  if (req.isAuthenticated()) {
    var user = req.user
    var targetUserID = req.params.id
    db('users')
      .join('roles', 'users.role', '=', 'roles.role_id')
      .select('user_id', 'username', 'role_name', 'faction', 'created_at')
      .where('user_id', targetUserID)
      .then(data => {
        var targetUser
        if (data.length > 0) {
          targetUser = data[0]
        }

        res.render('user.pug', {
          title: brand + ' - ' + slogan,
          user: user,
          targetUser
        })
      }).catch(err => console.log(err))
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
