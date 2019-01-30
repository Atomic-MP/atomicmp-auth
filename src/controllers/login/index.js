const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const loginStrategy = require('../../middlewares/login-strategy');
const { TITLE } = require('../../utils/constants');
const { logger } = require('../../services');
const { JWT_SECRET } = process.env;

router
  .route('/')
  .get((req, res) => {
    const user = req.user;
    res.render('login.pug', {
      TITLE,
      user,
    });
  })
  .post((req, res) => {
    loginStrategy.authenticate('local', (err, user) => {
      if (err) {
        logger.error(err);
        res.send(err);
        return;
      }
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
