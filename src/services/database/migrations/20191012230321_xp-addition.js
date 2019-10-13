
exports.up = function(knex, Promise) {
  knex.schema.alterTable('users', function(t) {
	  t.integer('xp').notNullable().defaultTo(0);
  });
};

exports.down = function(knex, Promise) {
  knex.schema.alterTable('users', function(t) {
	  t.dropColumn('xp');
  });
};
