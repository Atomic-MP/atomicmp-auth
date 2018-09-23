exports.up = function (knex, Promise) {
  return knex.schema.table('users', table => {
    table.string('recovery_request');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('users', table => {
    table.dropColumn('recovery_request');
  });
};
