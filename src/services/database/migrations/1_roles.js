const { ROLES } = require('../../../utils/constants');

exports.up = knex => {
  return knex.schema.hasTable('roles').then(exists => {
    if (!exists) {
      return knex.schema
        .createTable('roles', table => {
          table.increments('role_id').primary();
          table.string('role_name', 20).notNullable();
        })
        .then(() => {
          knex('roles').insert(ROLES);
        });
    }
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('roles');
};
