exports.up = knex => {
  return knex.schema.hasColumn('users', 'inventory').then(exists => {
    if (!exists) {
      return knex.schema.table('users', table => {
        table.text('inventory');
      });
    }
  });
};

exports.down = knex => {
  return knex.schema.table('users', table => {
    table.dropColumn('inventory');
  });
};
