exports.up = knex => {
  return knex.schema.hasColumn('users', 'hunger').then(hungerExists => {
    return knex.schema.hasColumn('users', 'thirst').then(thirstExists => {
      return knex.schema.table('users', table => {
        if (!hungerExists) {
          table.float('hunger').defaultTo(100);
        }
        if (!thirstExists) {
          table.float('thirst').defaultTo(100);
        }
      });
    });
  });
};

exports.down = knex => {
  return knex.schema.table('users', table => {
    table.dropColumn('hunger');
    table.dropColumn('thirst');
  });
};
