const express = require('express')
const router = express.Router();
const db = require('../../utils/database');
const fs = require('fs')

router.get("/sample-user-data", (req, res) => {
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
  })
});

router.post('/sample-user-data', async (req, res) => {
  const { health } = req.body.health
  await db('test_data')
    .insert({
      health
    })
  res.sendStatus(200)
})

module.exports = router