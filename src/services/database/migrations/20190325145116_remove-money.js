exports.up = knex => {
  return knex.schema.hasColumn('users', 'money').then(exists => {
    return knex.schema.table('users', table => {
      if (exists) {
        // Lenin would be proud
        table.dropColumn('money');
      }
    });
  });
};

exports.down = knex => {
  return knex.schema.table('users', table => {
    table.integer('money');
  });
};
