exports.up = knex => {
  return knex.schema.hasTable('keys').then(exists => {
    if (!exists) {
      return knex.schema.createTable('keys', table => {
        table.increments('key_id').primary();
        table.string('key', 23).notNullable();
        table
          .integer('owner')
          .unsigned()
          .references('user_id')
          .inTable('users');
        table.string('generator_discord_id').notNullable();
        table.string('discord_id').notNullable();
      });
    }
  });
};

exports.down = knex => {
  return knex.schema.dropTable('keys');
};
