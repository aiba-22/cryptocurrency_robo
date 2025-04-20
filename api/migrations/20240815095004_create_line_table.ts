export function up(knex: any) {
  return knex.schema.createTable("line", function (table) {
    table.increments("id");
    table.string("channel_access_token").notNullable();
    table.string("user_id").notNullable();
    table.timestamps(true, true);
  });
}

export function down(knex: any) {
  return knex.schema.dropTable("line");
}
