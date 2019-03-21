exports.up = knex => {
  return knex.schema.hasColumn('factions', 'color').then(colorExists => {
    return knex.schema.hasColumn('factions', 'role_id').then(idExists => {
      return knex.schema.table('factions', table => {
        if (!colorExists) {
          table.string('color');
        }
        if (!idExists) {
          table.string('role_id');
        }
      });
    });
  });
};
exports.down = knex => {
  return knex.schema.table('factions', table => {
    table.dropColumns('color', 'role_id');
  });
};
