export function up(knex: any) {
  return knex.schema.createTable("price_alert", function (table: any) {
    table.increments("id");
    table.jsonb("conditions").notNullable();
    table.timestamps(true, true);
  });
}

export function down(knex: any) {
  return knex.schema.dropTable("price_alert");
}
