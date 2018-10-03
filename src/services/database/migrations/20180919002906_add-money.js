exports.up = function(knex) {
  return knex.schema.table('users', table => {
    table.integer('money');
  });
};

exports.down = function(knex) {
  return knex.schema.table('users', table => {
    table.dropColumn('money');
  });
};
