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
      const settings = await this.db("price_notification")
        .where({ id })
        .first();

      if (!line.token || price > settings.target_price) {
        return "failure";
      }

      const token = line.token;
      const message = `目標価格に達しました。現在の価格は${price}円です。`;

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
      console.error("Error sending LINE notification:", error);
      return "failure";
    }
  }
}
