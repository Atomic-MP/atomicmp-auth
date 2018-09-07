const express = require('express');
const router = express.Router();
const first = require('lodash.first');
const db = require('../services/database');
const { TITLE } = require('../utils/constants');

/*
Model for valid signup credentials.
*/

const apiRoutes = require('./api');
const loginRoutes = require('./login');
const logoutRoutes = require('./logout');
const registerRoutes = require('./register');

router.use('/api', apiRoutes);
router.use('/login', loginRoutes);
router.use('/logout', logoutRoutes);
router.use('/register', registerRoutes);

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
    const targetUser = first(
      await db('users')
        .join('roles', 'users.role', '=', 'roles.role_id')
        .select('user_id', 'username', 'role_name', 'faction', 'created_at')
        .where('user_id', targetUserID)
    );

    res.render('user.pug', {
      TITLE,
      user,
      targetUser,
    });
  } else {
    res.redirect('/');
  }
});

router.get('/download', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect(
      'https://www.dropbox.com/s/d38336bouy9efoi/AMPBuild_29-07-18.zip'
    );
  }
});

router.use((req, res) => {
  res.redirect('/');
});

module.exports = router;
