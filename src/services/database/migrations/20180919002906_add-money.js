exports.up = knex => {
  return knex.schema.table('users', table => {
    table.integer('money');
  });
};

exports.down = knex => {
  return knex.schema.table('users', table => {
    table.dropColumn('money');
  });
};
