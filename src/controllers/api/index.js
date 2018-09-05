const express = require('express');
const router = express.Router();
const db = require('../../services/database');
const first = require('lodash.first');
const isEmpty = require('lodash.isempty');

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
    player_rot_x: 270,
    player_rot_y: 0,
    player_rot_z: 0,
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

router.put('/update-user-info/:id', async (req, res) => {
  var targetUserID = req.params.id;
  const { health } = req.body;
  await db('users')
    .where('user_id', targetUserID)
    .update({health})
  res.sendStatus(200)
})

router.get('/user-info/:id', async (req, res) => {
  var targetUserID = req.params.id;
  const data = await db('users')
    .where('user_id', targetUserID)
    .select('username', 'health', 'discord_id')
  if (!isEmpty(data)) {
    const responseData = first(data)
    res.json(responseData)
  } else {
    res.sendStatus(404)
  }
})

module.exports = router;
