import { items } from './items';

const constants = {
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
  ITEMS: items,
};

export default constants;
