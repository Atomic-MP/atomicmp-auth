const express = require('express');
const router = express.Router();
const first = require('lodash.first');
const isEmpty = require('lodash.isempty');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const { db, logger } = require('../../services');
const { JWT_SECRET } = process.env;
const { TITLE, SALT_ROUNDS } = require('../../utils/constants');
const { isValidSignupCredentials } = require('../../helpers');

router
  .route('/')
  .get((req, res) => {
    let user;
    if (req.isAuthenticated()) {
      user = req.user;
    }
    res.render('register.pug', {
      TITLE,
      user,
    });
  })
  .post(async (req, res) => {
    if (!req.body || !req.body.username || !req.body.password)
      return res.sendStatus(400);
    req.body.username = req.body.username.trim();
    if (isValidSignupCredentials(req.body)) {
      const username = req.body.username;
      // Check if username exists; case insensitive
      const usernameExists = !isEmpty(
        await db.raw(
          `SELECT * FROM users WHERE LOWER(username)=LOWER('${
            req.body.username
          }')`
        ).rows
      );
      if (usernameExists) {
        logger.warn(`User ${username} already exists`);
        return res.send(createError(409, `User ${username} already exists`));
      }
      const key = first(
        await db('keys')
          .select('key_id', 'discord_id')
          .where('key', req.body.key)
          .andWhere('owner', null)
      );
      if (!key) {
        return res.send(createError(404, `Key ${key} not found`));
      }
      const keyID = key.key_id;
      const hash = await bcrypt.hash(req.body.password, SALT_ROUNDS);
      const userId = first(
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
        .update('owner', userId);
      const token = jwt.sign(
        {
          userId,
          username,
        },
        JWT_SECRET
      );
      res.json({
        token,
      });
    }
  });

module.exports = router;
