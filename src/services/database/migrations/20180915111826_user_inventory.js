exports.up = function(knex) {
  return knex.schema.table('users', table => {
    table.text('inventory');
  });
};

exports.down = function(knex) {
  return knex.schema.table('users', table => {
    table.dropColumn('inventory');
  });
};
