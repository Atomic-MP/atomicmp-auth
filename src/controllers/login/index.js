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
  // .post((req, res) => {
  //   passport.authenticate('local', (err, user, info) => {
  //     if (user) {
  //       const id = user.user_id.toString();
  //       res.json({id});
  //     } else {
  //       res.sendStatus(401);
  //     }

  //   })(req, res);
  // });

  .post(passport.authenticate('local'), (req, res) => {
    res.sendStatus(200)
  })

module.exports = router;
