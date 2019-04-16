exports.up = knex => {
  return knex.schema.hasTable('factions').then(exists => {
    if (!exists) {
      return knex.schema.createTable('factions', table => {
        table.increments('faction_id').primary();
        table.string('faction_name', 30).notNullable();
      });
    }
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('factions');
};
