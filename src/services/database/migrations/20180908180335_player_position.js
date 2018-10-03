exports.up = function(knex) {
  return knex.schema.table('users', table => {
    table.float('x_pos');
    table.float('y_pos');
    table.float('z_pos');
  });
};

exports.down = function(knex) {
  return knex.schema.table('users', table => {
    table.dropColumn('x_pos');
    table.dropColumn('y_pos');
    table.dropColumn('z_pos');
  });
};
