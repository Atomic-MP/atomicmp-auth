const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../../services/database');
const { TITLE, SALT_ROUNDS } = require('../../utils/constants');

const { isValidPassword } = require('../../helpers');

router
  .get('/', async (req, res) => {
    const user = req.user;
    const requestId = req.query.id;
    if (!requestId) {
      res.status(400).send({ error: 'Route requires id' });
      return;
    }
    const [resetTarget] = await db('users').where({
      recovery_request: requestId,
    });
    if (!resetTarget) {
      res.status(404).send({
        error: 'Recovery code no longer valid',
      });
      return;
    }

    res.render('recovery.pug', {
      TITLE,
      user,
      resetTarget,
      requestId,
    });
  })
  .post('/', async (req, res) => {
    const { requestId, password, confirmPassword } = req.body;
    if (
      !requestId ||
      !password ||
      !confirmPassword ||
      !isValidPassword(req.body)
    ) {
      res.status(400).send({
        error: 'Malformed password reset payload',
      });
      return;
    }

    const [user] = await db('users').where({
      recovery_request: requestId,
    });
    if (!user) {
      res.status(404).send({
        error: 'No recovery request found',
      });
      return;
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    await db('users')
      .where({
        user_id: user.user_id,
      })
      .update({
        hash,
        recovery_request: '',
      });
    res.sendStatus(200);
  });

module.exports = router;
