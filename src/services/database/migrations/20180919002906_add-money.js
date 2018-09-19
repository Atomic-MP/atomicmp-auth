exports.up = function (knex, Promise) {
  return knex.schema.table('users', table => {
    table.integer('money');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('users', table => {
    table.dropColumn('money');
  });
};
