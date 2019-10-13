
exports.up = function(knex, Promise) {
  knex.schema.alterTable('users', function(t) {
	  t.integer('xp');
  }
};

exports.down = function(knex, Promise) {
  knex.schema.alterTable('users', function(t) {
	  t.dropColumn('xp');
  }
};
