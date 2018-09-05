const express = require('express');
const router = express.Router();
const first = require('lodash.first');
const db = require('../services/database');
const { title } = require('../utils/constants');

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

// /api/dump-user-state
/*
{
  money: 3000,
  inventory: 'apple,,,,,,,,,'
    player_pos_x: 100,
    player_pos_y: -201.54,
    player_pos_z: 350,
    hunger: 55.43,
    thirst: 55.43,
    health: Math.floor(Math.random() * 100 + 1),
}

/api/update-user/:id/money
  caps: 587,

/api/update-user/:id/inventory
  
{
  inventory: 
}
*/

// /api/user-stats

router.get('/', (req, res) => {
  let user;
  if (req.isAuthenticated()) {
    user = req.user;
  }
  res.render('index.pug', {
    title,
    user,
  });
});

router.get('/user/:id', async (req, res) => {
  if (req.isAuthenticated()) {
    var user = req.user;
    var targetUserID = req.params.id;
    const targetUser = first(
      await db('users')
        .join('roles', 'users.role', '=', 'roles.role_id')
        .select('user_id', 'username', 'role_name', 'faction', 'created_at')
        .where('user_id', targetUserID)
    );

    res.render('user.pug', {
      title,
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
