exports.up = function(knex) {
  return knex.schema.createTable('price_notification', function(table) {
    table.increments('id');
    table.string('virtual_currency_type').notNullable();
    table.integer('target_price').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('price_notification');
};
