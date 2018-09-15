exports.up = function (knex, Promise) {
  return knex.schema.table('users', table => {
    table.json('inventory');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('users', table => {
    table.dropColumn('inventory');
  });
};
