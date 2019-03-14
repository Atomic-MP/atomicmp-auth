exports.up = knex => {
  return knex.schema.table('users', table => {
    table.float('hunger');
    table.float('thirst');
  });
};

exports.down = knex => {
  return knex.schema.table('users', table => {
    table.dropColumn('hunger');
    table.dropColumn('thirst');
  });
};
