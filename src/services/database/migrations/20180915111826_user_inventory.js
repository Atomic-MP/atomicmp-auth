exports.up = knex => {
  return knex.schema.table('users', table => {
    table.text('inventory');
  });
};

exports.down = knex => {
  return knex.schema.table('users', table => {
    table.dropColumn('inventory');
  });
};
