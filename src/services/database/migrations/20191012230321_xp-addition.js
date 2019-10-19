const USERS_TABLE_NAME = 'users';
const XP_COLUMN_NAME = 'xp';

exports.up = function(knex) {
  return knex.schema
    .hasColumn(USERS_TABLE_NAME, XP_COLUMN_NAME)
    .then(xpExists => {
      if (!xpExists) {
        return knex.schema.alterTable(USERS_TABLE_NAME, function(t) {
          t.integer(XP_COLUMN_NAME)
            .notNullable()
            .defaultTo(0);
        });
      }
    });
};

exports.down = function(knex) {
  return knex.schema
    .hasColumn(USERS_TABLE_NAME, XP_COLUMN_NAME)
    .then(xpExists => {
      if (xpExists) {
        return knex.schema.alterTable(USERS_TABLE_NAME, function(t) {
          t.dropColumn(XP_COLUMN_NAME);
        });
      }
    });
};
