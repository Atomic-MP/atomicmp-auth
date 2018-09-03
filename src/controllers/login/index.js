const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('../../middlewares/passport');
const { title } = require('../../utils/constants');
const { JWT_SECRET } = process.env;

router
  .route('/')
  .get((req, res) => {
    let user;
    if (req.isAuthenticated()) {
      user = req.user;
    }
    res.render('login.pug', {
      title,
      user,
    });
  })
  .post((req, res) => {
    passport.authenticate('local', (err, user, info) => {      
      const token = jwt.sign({ 
        userID: user.user_id,
        username: user.username
      }, JWT_SECRET);
      res.json({ token });
    })(req,res);
  });

module.exports = router;
