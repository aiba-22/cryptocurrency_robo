exports.up = function(knex) {
  return knex.schema.createTable('notification_settings', function(table) {
    table.increments('id');
    table.string('currency_type').notNullable();
    table.integer('target_price').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('notification_settings');
};
