const express = require('express');
const hexRgb = require('hex-rgb');
const createError = require('http-errors');
const router = express.Router();
const protectedRoute = require('../../middlewares/protected-route');
const { db, logger } = require('../../services');
const { HEADS, HAIRS, HAIR_COLORS } = require('../../utils/constants');

router.use(protectedRoute);

/**
 * This is a sample of the user data output from user data dump
 */
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
    money: 587,
  });
});

router.put('/save', async (req, res) => {
  const user = req.user;
  const {
    health,
    hunger,
    thirst,
    x_pos,
    y_pos,
    z_pos,
    inventory,
    money,
  } = req.body;

  logger.info(`inventory: ${inventory}, money: ${money}`);

  await db('users')
    .where('user_id', user.user_id)
    .update({
      health,
      hunger,
      thirst,
      x_pos,
      y_pos,
      z_pos,
      inventory,
      money,
    });
  res.sendStatus(200);
});

router.put('/set-appearance', async (req, res) => {
  const user = req.user;
  const { nickname, head, hair, hair_color, is_male } = req.body;

  if (
    nickname == undefined ||
    head == undefined ||
    hair == undefined ||
    hair_color == undefined ||
    is_male == undefined
  ) {
    logger.error('[SET-APPEARANCE][ERROR] Payload contains insufficient data');
    res.send(createError(400, 'Payload contains insufficient data'));
    return;
  }
  if (nickname.length > 24) {
    logger.error(`[SET-APPEARANCE][ERROR] Nickname too long`);
    res.send(createError(400, 'Nickname too long'));
    return;
  }
  if (head < 1 > HEADS) {
    logger.error(`[SET-APPEARANCE][ERROR] Head ${head} is malformed`);
    res.send(createError(400, `Head ${head} is malformed`));
    return;
  }

  if (hair < 1 > HAIRS) {
    logger.error(`[SET-APPEARANCE][ERROR] Hair ${hair} is malformed`);
    res.send(createError(400, `Hair ${hair} is malformed`));
    return;
  }
  if (hair_color < 1 > HAIR_COLORS) {
    logger.error(
      `[SET-APPEARANCE][ERROR] Hair Color ${hair_color} is malformed`
    );
    res.send(createError(400, `Hair Color ${hair_color} is malformed`));
    return;
  }
  if (typeof is_male !== 'boolean') {
    logger.error(`[SET-APPEARANCE][ERROR] Sex ${is_male} is malformed`);
    res.send(createError(400, `Sex ${is_male} is malformed`));
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
  const [user] = await db('users')
    .where('user_id', targetUserID)
    .select('username', 'health', 'discord_id');
  if (user) {
    res.json(user);
  } else {
    res.send(createError(404, `User ${targetUserID} not found`));
  }
});
router.get('/faction-info/:id', async (req, res) => {
  const targetFactionID = req.params.id;
  const [faction] = await db('factions').where('faction_id', targetFactionID);
  if (faction) {
    res.json(faction);
  } else {
    res.send(createError(404, `Faction ${targetFactionID} not found`));
  }
});

router.get('/load', async (req, res) => {
  // Explicitly defining the data points that should be
  // set to the client on load
  const savestateKeys = new Set([
    'user_id',
    'username',
    'role',
    'faction',
    'health',
    'hunger',
    'thirst',
    'head',
    'hair',
    'hair_color',
    'is_male',
    'nickname',
    'x_pos',
    'y_pos',
    'z_pos',
    'inventory',
    'money',
  ]);

  const user = req.user;
  for (const key of Object.keys(user)) {
    if (!savestateKeys.has(key)) delete user[key];
  }
  logger.info(JSON.stringify(user));
  // LEFT JOIN faction data

  if (user.faction) {
    const [factionData] = await db('factions').where(
      'faction_id',
      user.faction
    );
    const [faction_color_r, faction_color_g, faction_color_b] = hexRgb(
      factionData.color || '#FFFFFF',
      {
        format: 'array',
      }
    );

    user.faction_color_r = faction_color_r;
    user.faction_color_g = faction_color_g;
    user.faction_color_b = faction_color_b;
  }
  res.json(user);
});

module.exports = router;
