const express = require('express');
const router = express.Router();
const first = require('lodash.first');
const isEmpty = require('lodash.isempty');
const bcrypt = require('bcrypt');
const db = require('../../services/database');
const { brand, slogan, saltRounds } = require('../../utils/constants');

const isValidSignupCredentials = payload => {
  const validUsernameRegex = /^([a-zA-Z ]){3,24}$/;
  const validPasswordRegex = /^([A-Za-z\d$@$!%*?&]){8,50}$/;
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
  );
};

router
  .route('/')
  .get((req, res) => {
    let user;
    if (req.isAuthenticated()) {
      user = req.user;
    }
    res.render('register.pug', {
      title: brand + ' - ' + slogan,
      user: user,
    });
  })
  .post(async (req, res, next) => {
    if (!req.body || !req.body.username || !req.body.password)
      return res.sendStatus(400);
    req.body.username = req.body.username.trim();
    if (isValidSignupCredentials(req.body)) {
      var username = req.body.username;
      // Check if username exists; case insensitive
      const usernameExists = !isEmpty(
        await db.raw(
          `SELECT * FROM users WHERE LOWER(username)=LOWER('${
          req.body.username
          }')`
        ).rows
      );
      if (usernameExists) {
        console.log(`User ${username} already exists`);
        return res.sendStatus(409);
      }
      const key = first(
        await db('keys')
          .select('key_id', 'discord_id')
          .where('key', req.body.key)
          .andWhere('owner', null)
      );
      if (!key) {
        return res.sendStatus(409);
      }
      const keyID = key.key_id;
      const hash = await bcrypt.hash(req.body.password, saltRounds);
      const ownerId = first(
        await db('users')
          .returning('user_id')
          .insert({
            username,
            hash,
            role: 3,
            faction: null,
            discord_id: key.discord_id,
            created_at: new Date(),
            health: 100,
          })
      );
      await db('keys')
        .where('key_id', keyID)
        .update('owner', ownerId);
      res.redirect('/');
    }
  });

module.exports = router;
