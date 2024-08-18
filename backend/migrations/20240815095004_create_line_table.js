export function up(knex) {
  return knex.schema.createTable("line", function (table) {
    table.increments("id");
    table.string("token").notNullable();
    table.timestamps(true, true);
  });
}

export function down(knex) {
  return knex.schema.dropTable("line");
}
