const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const loginStrategy = require('../../middlewares/login-strategy');
const jwtAuthentication = require('../../middlewares/jwt-authentication');
const { title } = require('../../utils/constants');
const { JWT_SECRET } = process.env;

router
  .route('/')
  .get((req, res) => {
    jwtAuthentication.authenticate('jwt', (err, user, info) => {
      if (err) {
        res.sendStatus(503)
      }
      res.render('login.pug', {
        title,
        user,
      });
    })(req,res)
  })
  .post((req, res) => {
    loginStrategy.authenticate('local', (err, user, info) => {
      if (user) {
        const token = jwt.sign(
          {
            userId: user.user_id,
            username: user.username,
          },
          JWT_SECRET
        );
        res.json({ token });
      } else {
        res.sendStatus(401);
      }
    })(req, res);
  });

module.exports = router;
