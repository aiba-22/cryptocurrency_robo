import axios from "axios";
import db from "../db";

export default class LineService {
  db;
  constructor() {
    this.db = db;
  }

  async find(id: number) {
    const line = await this.db("line").where({ id }).first();

    return {
      lineToken: line?.channel_access_token || null,
      userId: line?.user_id || null,
    };
  }

  async create({ lineToken, userId }: { lineToken: string; userId: string }) {
    const transaction = await this.db.transaction();
    try {
      await transaction("line").insert({
        channel_access_token: lineToken,
        user_id: userId,
        created_at: new Date(),
      });

      await transaction.commit();
      return "success";
    } catch (error) {
      await transaction.rollback();
      return "failure";
    }
  }

  async update({
    id,
    lineToken,
    userId,
  }: {
    id: number;
    lineToken: string;
    userId: string;
  }) {
    const transaction = await this.db.transaction();
    try {
      await transaction("line").where({ id }).update({
        channel_access_token: lineToken,
        user_id: userId,
        updated_at: new Date(),
      });

      await transaction.commit();
      return "success";
    } catch (error) {
      await transaction.rollback();
      return "failure";
    }
  }

  async send({ id, price }: { id: number; price: number }) {
    const line = await this.db("line").where({ id }).first();
    if (!line) return "systemError";

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
      await axios.post("https://api.line.me/v2/bot/message/push", body, {
        headers: {
          Authorization: `Bearer ${channelAccessToken}`,
          "Content-Type": "application/json",
        },
      });
      return "success";
    } catch (error) {
      return "failure";
    }
  }
}
