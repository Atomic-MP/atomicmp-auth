exports.up = function (knex, Promise) {
  return knex.schema.table('users', table => {
    table.string('inventory');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('users', table => {
    table.dropColumn('inventory');
  });
};
