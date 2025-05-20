export function up(knex: any) {
  return knex.schema.createTable("line", function (table: any) {
    table.increments("id");
    table.integer("user_id").notNullable();
    table.string("channel_access_token").notNullable();
    table.string("line_user_id").notNullable();
    table.timestamps(true, true);
  });
}

export function down(knex: any) {
  return knex.schema.dropTable("line");
}
