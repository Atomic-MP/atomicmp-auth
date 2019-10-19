exports.up = knex => {
  return knex.schema.hasColumn('users', 'nickname').then(nicknameExists => {
    if (!nicknameExists) {
      return knex.schema.table('users', table => {
        table.string('nickname');
      });
    }
  });
};

exports.down = knex => {
  return knex.schema.hasColumn('users', 'nickname').then(nicknameExists => {
    if (nicknameExists) {
      return knex.schema.table('users', table => {
        table.dropColumn('nickname');
      });
    }
  });
};
