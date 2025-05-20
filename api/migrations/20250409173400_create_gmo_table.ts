export function up(knex: any) {
  return knex.schema.createTable("gmo", function (table: any) {
    table.increments("id");
    table.integer("user_id").notNullable();
    table.string("api_key", 255).notNullable();
    table.string("secret_key", 255).notNullable();
    table.timestamps(true, true);
  });
}

export function down(knex: any) {
  return knex.schema.dropTable("gmo");
}
