exports.up = function(knex) {
  return knex.schema.table('users', table => {
    table.string('nickname');
  });
};

exports.down = function(knex) {
  return knex.schema.table('users', table => {
    table.dropColumn('nickname');
  });
};
