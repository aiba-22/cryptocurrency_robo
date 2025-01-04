import knex from "knex";
import axios from "axios";

export class LineService {
  constructor() {
    this.db = knex({
      client: "mysql2",
      connection: {
        host: "db",
        user: "root",
        password: "password",
        database: "mydatabase",
      },
    });
  }

  async sendNotification(id, price) {
    try {
      const line = await this.db("line").where({ id }).first();
      const token = line.token;
      const message = `現在の価格は${price}円です。`;

      await axios.post(
        "https://notify-api.line.me/api/notify",
        `message=${encodeURIComponent(message)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      return "success";
    } catch (error) {
      return "failure";
    }
  }
}
