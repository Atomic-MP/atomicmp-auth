exports.up = function(knex, Promise) {
  return knex.schema.table('factions', table => {
    table.string('color');
    table.string('role_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('factions', table => {
    table.dropColumns('color', 'role_id');
  });
};