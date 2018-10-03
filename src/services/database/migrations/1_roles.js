const { ROLES } = require('../../../utils/constants');

exports.up = async knex => {
  await knex.schema.createTable('roles', table => {
    table.increments('role_id').primary();
    table.string('role_name', 20).notNullable();
  });
  await knex('roles').insert(ROLES);
};

exports.down = knex => {
  return knex.schema.dropTable('roles');
};
