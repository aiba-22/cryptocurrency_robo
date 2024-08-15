const knex = require('knex');

export const db = knex({
  client: 'mysql2',
  connection: {
    host: 'db',
    user: 'root',
    password: 'password',
    database: 'mydatabase'
  }
});