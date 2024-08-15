exports.up = function(knex) {
  return knex.schema.createTable('line', function(table) {
    table.increments('id');
    table.string('token').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('line');
};
