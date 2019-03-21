// Due to the synchronicity of the migrations things got really weird. Going to need a separate migration to create a column with JSON type
exports.up = knex => {
  return knex.schema.table('users', table => {
    table
      .json('inventory')
      .notNullable()
      .defaultTo('[]');
  });
};

exports.down = knex => {
  return knex.schema.table('users', table => {
    table.dropColumn('inventory');
  });
};
