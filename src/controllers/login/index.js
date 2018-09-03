const express = require('express');
const router = express.Router();
const passport = require('../../middlewares/passport');
const { brand, slogan } = require('../../utils/constants');

router
  .route('/')
  .get((req, res) => {
    let user;
    if (req.isAuthenticated()) {
      user = req.user;
    }
    res.render('login.pug', {
      title: brand + ' - ' + slogan,
      user: user,
    });
  })
  .post(passport.authenticate('local'), (req, res) => {
    res.sendStatus(200);
  });

module.exports = router;
