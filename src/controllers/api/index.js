const express = require('express');
const router = express.Router();
const db = require('../../services/database');
const first = require('lodash.first');
const isEmpty = require('lodash.isempty');
const { HEADS, HAIRS, HAIR_COLORS } = require('../../utils/constants');

function protectedRoute(req, res, next) {
  if (!req.isAuthenticated()) {
    res.sendStatus(401);
    return;
  }
  next();
}
router.use(protectedRoute);

router.get('/sample-user-data', (req, res) => {
  res.json({
    user_id: 1,
    is_admin: false,
    is_male: true,
    male_head: 1,
    male_hair: 1,
    female_head: 1,
    female_hair: 1,
    hair_color: 1,
    player_pos_x: 100,
    player_pos_y: -201.54,
    player_pos_z: 350,
    hunger: 55.43,
    thirst: 55.43,
    health: Math.floor(Math.random() * 100 + 1),
    caps: 587,
  });
});

router.post('/sample-user-data', async (req, res) => {
  const { health } = req.body;
  await db('test_data').insert({
    health,
  });
});

router.put('/save', async (req, res) => {
  const user = req.user;
  console.log('[SAVE]', user);
  const { health } = req.body;
  await db('users')
    .where('user_id', user.user_id)
    .update({ health });
  res.sendStatus(200);
});

router.put('/set-appearance', async (req, res) => {
  const user = req.user;
  const { nickname, head, hair, hair_color, is_male } = req.body;
  console.log('[SET-APPEARANCE] user', user);

  if (
    nickname == undefined ||
    head == undefined ||
    hair == undefined ||
    hair_color == undefined ||
    is_male == undefined
  ) {
    console.error('[SET-APPEARANCE][ERROR] Payload contains insufficient data');
    res.sendStatus(400);
    return;
  }
  if (nickname.length > 20) {
    console.error(`[SET-APPEARANCE][ERROR] Nickname too long`);
    res.sendStatus(400);
    return;
  }
  if (head < 1 > HEADS) {
    console.error(`[SET-APPEARANCE][ERROR] Head ${head} is malformed`);
    res.sendStatus(400);
    return;
  }

  if (hair < 1 > HAIRS) {
    console.error(`[SET-APPEARANCE][ERROR] Hair ${hair} is malformed`);
    res.sendStatus(400);
    return;
  }
  if (hair_color < 1 > HAIR_COLORS) {
    console.error(
      `[SET-APPEARANCE][ERROR] Hair Color ${hair_color} is malformed`
    );
    res.sendStatus(400);
    return;
  }
  if (typeof is_male !== 'boolean') {
    console.error(`[SET-APPEARANCE][ERROR] Sex ${is_male} is malformed`);
    res.sendStatus(400);
    return;
  }

  await db('users')
    .where('user_id', user.user_id)
    .update({
      nickname,
      head,
      hair,
      hair_color,
      is_male,
    });
  res.sendStatus(200);
});

router.get('/user-info/:id', async (req, res) => {
  const targetUserID = req.params.id;
  const data = await db('users')
    .where('user_id', targetUserID)
    .select('username', 'health', 'discord_id');
  if (!isEmpty(data)) {
    const responseData = first(data);
    res.json(responseData);
  } else {
    res.sendStatus(404);
  }
});

router.get('/load', async (req, res) => {
  const user = req.user;
  res.json(user);
});

module.exports = router;
