exports.up = knex => {
  return knex.schema.table('users', table => {
    table
      .float('rotation', 2)
      .notNullable()
      .defaultTo(0);
  });
};

exports.down = knex => {
  return knex.schema.table('users', table => {
    table.dropColumn('rotation');
  });
};
