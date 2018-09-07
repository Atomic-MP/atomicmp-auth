
const generate1IndexedArray = (length) =>
  Array(length).fill().map((_, index) => index + 1)

const constants = {
  TITLE: 'Atomic MP - A Multiplayer Fallout Roleplay Experience',
  SALT_ROUNDS: 10,
  HEADS: generate1IndexedArray(10),
  HAIRS: generate1IndexedArray(24),
  HAIR_COLORS: generate1IndexedArray(7)
};

module.exports = constants;
