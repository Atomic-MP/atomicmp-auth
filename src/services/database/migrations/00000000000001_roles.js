const ROLES = [
  {
    role_id: 1,
    role_name: 'banned',
  },
  {
    role_id: 2,
    role_name: 'kicked',
  },
  {
    role_id: 3,
    role_name: 'user',
  },
  {
    role_id: 4,
    role_name: 'moderator',
  },
  {
    role_id: 5,
    role_name: 'admin',
  },
];

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
