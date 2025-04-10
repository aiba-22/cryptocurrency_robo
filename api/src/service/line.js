import axios from "axios";
import db from "../db.js";

export class LineService {
  db;
  constructor() {
    this.db = db;
  }

  async find(id) {
    const line = await this.db("line").where({ id }).first();

    return {
      lineToken: line?.channel_access_token || null,
      userId: line?.user_id || null,
    };
  }

  async send({ id, price }) {
    const line = await this.db("line").where({ id }).first();
    if (!line) return "failure";

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

    try {
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
      return "failure";
    }
  }
}
