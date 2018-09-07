const { ROLES } = require('../../../utils/constants')

exports.up = async (knex, Promise) => {
  await knex.schema.createTable('roles', table => {
    table.increments('role_id').primary();
    table.string('role_name', 20).notNullable();
  });
  await knex('roles').insert(ROLES);
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('roles');
};
