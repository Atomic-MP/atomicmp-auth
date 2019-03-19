exports.up = knex => {
  return knex.schema.hasColumn('users', 'x_pos').then(xexists => {
    return knex.schema.hasColumn('users', 'y_pos').then(yexists => {
      return knex.schema.hasColumn('users', 'z_pos').then(zexists => {
        // HADOOOKEN
        return knex.schema.table('users', table => {
          if (!xexists) {
            table.float('x_pos');
          }
          if (!yexists) {
            table.float('y_pos');
          }
          if (!zexists) {
            table.float('z_pos');
          }
        });
      });
    });
  });
};
exports.down = knex => {
  return knex.schema.table('users', table => {
    table.dropColumn('x_pos');
    table.dropColumn('y_pos');
    table.dropColumn('z_pos');
  });
};
