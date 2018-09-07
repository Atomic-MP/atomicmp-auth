
const generate1IndexedArray = (length) =>
  Array(length).fill().map((_, index) => index + 1)

const constants = {
  TITLE: 'Atomic MP - A Multiplayer Fallout Roleplay Experience',
  SALT_ROUNDS: 10,
  HEADS: 10,
  HAIRS: 24,
  HAIR_COLORS: 7
};

module.exports = constants;
