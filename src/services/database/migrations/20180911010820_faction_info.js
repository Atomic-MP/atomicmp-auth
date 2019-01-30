exports.up = knex => {
  return knex.schema.table('factions', table => {
    table.string('color');
    table.string('role_id');
  });
};

exports.down = knex => {
  return knex.schema.table('factions', table => {
    table.dropColumns('color', 'role_id');
  });
};
