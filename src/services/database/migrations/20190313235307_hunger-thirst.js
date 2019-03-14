exports.up = knex => {
  return knex.schema.table('users', table => {
    table.float('hunger').defaultTo(100);
    table.float('thirst').defaultTo(100);
  });
};

exports.down = knex => {
  return knex.schema.table('users', table => {
    table.dropColumn('hunger');
    table.dropColumn('thirst');
  });
};
