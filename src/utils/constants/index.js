'use strict';
exports.__esModule = true;
var ITEMS = require('./items');
var constants = {
  TITLE: 'Atomic MP - A Multiplayer Fallout Roleplay Experience',
  SALT_ROUNDS: 10,
  HEADS: 10,
  HAIRS: 24,
  HAIR_COLORS: 7,
  ROLES: [
    {
      role_id: 1,
      role_name: 'banned',
    },
    {
      role_id: 2,
      role_name: 'kicked',
    },
    {
      role_id: 3,
      role_name: 'user',
    },
    {
      role_id: 4,
      role_name: 'moderator',
    },
    {
      role_id: 5,
      role_name: 'admin',
    },
  ],
  ITEMS: ITEMS,
  STARTING_COORDS: {
    x: 69449.953125,
    y: -26285.0,
    z: -5968.092285,
  },
};
exports['default'] = constants;
