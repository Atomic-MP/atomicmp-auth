exports.up = function(knex) {
  return knex.schema.alterTable('users', function(t) {
    t.integer('xp')
      .notNullable()
      .defaultTo(0);
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('users', function(t) {
    t.dropColumn('xp');
  });
};
