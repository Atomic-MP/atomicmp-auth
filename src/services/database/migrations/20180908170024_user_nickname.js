exports.up = function(knex, Promise) {
  return knex.schema.table('users', table => {
    table.string('nickname');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', table => {
    table.dropColumn('nickname');
  });
};
