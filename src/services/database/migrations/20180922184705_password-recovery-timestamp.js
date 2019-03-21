exports.up = knex => {
  return knex.schema.hasColumn('users', 'recovery_request').then(exists => {
    if (!exists) {
      return knex.schema.table('users', table => {
        table.string('recovery_request');
      });
    }
  });
};

exports.down = knex => {
  return knex.schema.table('users', table => {
    table.dropColumn('recovery_request');
  });
};
