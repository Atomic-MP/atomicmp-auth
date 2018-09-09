exports.up = function(knex, Promise) {
  return knex.schema.table('users', table => {
    table.float('player_pos_x');
    table.float('player_pos_y');
    table.float('player_pos_z');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', table => {
    table.dropColumn('player_pos_x');
    table.dropColumn('player_pos_y');
    table.dropColumn('player_pos_z');
  });
};
