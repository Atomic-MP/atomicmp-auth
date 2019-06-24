import { items } from "./items";

const SALT_ROUNDS = 10;
const HEADS = 10;
const HAIRS = 24;
const HAIR_COLORS = 7;
const ROLES: IRole[] = [
    {
      role_id: 1,
      role_name: "banned",
    },
    {
      role_id: 2,
      role_name: "kicked",
    },
    {
      role_id: 3,
      role_name: "user",
    },
    {
      role_id: 4,
      role_name: "moderator",
    },
    {
      role_id: 5,
      role_name: "admin",
    },
  ];
const ITEMS = items;

export {
  SALT_ROUNDS,
  HEADS,
  HAIRS,
  HAIR_COLORS,
  ROLES,
  ITEMS,
};
