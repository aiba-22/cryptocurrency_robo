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
      const channelAccessToken = line.channel_access_token;
      const userId = line.user_id;
      const body = {
        to: userId,
        messages: [
          {
            type: "text",
            text: `現在の価格は${price}円です。`,
          },
        ],
      };
      await axios.post(
        "https://api.line.me/v2/bot/message/push",
        // `message=${encodeURIComponent(message)}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${channelAccessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return "success";
    } catch (error) {
      console.log(error);
      return "failure";
    }
  }
}
