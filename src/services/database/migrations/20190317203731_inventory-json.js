// Refactor shitty, insecure CSV inventory system with a legitimate data structure
exports.up = knex => {
  return knex.schema.table('users', table => {
    table.dropColumn('inventory');
    table.json('inventory').defaultTo('[]');
  });
};

exports.down = knex => {
  return knex.schema.table('users', table => {
    table.dropColumn('inventory');
  });
};
