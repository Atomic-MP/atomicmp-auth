exports.up = knex => {
  return knex.schema.table('users', table => {
    table.string('nickname');
  });
};

exports.down = knex => {
  return knex.schema.table('users', table => {
    table.dropColumn('nickname');
  });
};
