const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const { db, logger } = require('../services');
const { TITLE } = require('../utils/constants');

const apiRoutes = require('./api');
const loginRoutes = require('./login');
const logoutRoutes = require('./logout');
const registerRoutes = require('./register');
const recoveryRoutes = require('./recovery');

router.use('/api', apiRoutes);
router.use('/login', loginRoutes);
router.use('/logout', logoutRoutes);
router.use('/register', registerRoutes);
router.use('/recovery', recoveryRoutes);

router.get('/', (req, res) => {
  let user;
  if (req.isAuthenticated()) {
    user = req.user;
  }
  res.render('index.pug', {
    TITLE,
    user,
  });
});

router.get('/user/:id', async (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user;
    const targetUserID = req.params.id;
    const [targetUser] = await db('users')
      .join('roles', 'users.role', '=', 'roles.role_id')
      .select('user_id', 'username', 'role_name', 'faction', 'created_at')
      .where('user_id', targetUserID);

    res.render('user.pug', {
      TITLE,
      user,
      targetUser,
    });
  } else {
    res.redirect('/');
  }
});

router.get('/faction/:id', async (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user;
    const targetFactionID = req.params.id;
    const [faction] = await db('factions').where('faction_id', targetFactionID);
    if (faction) {
      logger.info(faction);
      res.render('faction.pug', {
        TITLE,
        user,
        faction,
      });
    } else {
      res.send(createError(404, 'Faction not found'));
    }
  } else {
    res.redirect('/');
  }
});

router.use((req, res) => {
  res.redirect('/');
});

module.exports = router;
