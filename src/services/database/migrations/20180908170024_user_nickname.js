exports.up = knex => {
  return knex.schema.hasColumn('users', 'nickname').then(exists => {
    if (!exists) {
      knex.schema.table('users', table => {
        table.string('nickname');
      });
    }
  });
};

exports.down = knex => {
  return knex.schema.table('users', table => {
    table.dropColumn('nickname');
  });
};
