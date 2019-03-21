// Refactor shitty, insecure CSV inventory system with a legitimate data structure
exports.up = knex => {
  return knex.schema
    .hasColumn('users', 'inventory')
    .then(inventoryColumnExists => {
      return knex.schema.table('users', table => {
        if (inventoryColumnExists) {
          table.dropColumn('inventory');
        }
      });
    });
};

exports.down = knex => {
  return knex.schema.table('users', table => {
    table.dropColumn('inventory');
  });
};
