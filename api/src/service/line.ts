import axios from "axios";
import db from "../db";

export default class LineService {
  db;
  constructor() {
    this.db = db;
  }

  async find() {
    const line = await this.db("line").where({ id: 1 }).first(); //アカウント機能はつけない想定なのでid固定

    return {
      id: line.id,
      channelAccessToken: line.channel_access_token,
      userId: line.user_id,
    };
  }

  async create({
    channelAccessToken,
    userId,
  }: {
    channelAccessToken: string;
    userId: string;
  }) {
    const transaction = await this.db.transaction();
    try {
      await transaction("line").insert({
        channel_access_token: channelAccessToken,
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
    channelAccessToken,
    userId,
  }: {
    id: number;
    channelAccessToken: string;
    userId: string;
  }) {
    const transaction = await this.db.transaction();
    try {
      await transaction("line").where({ id }).update({
        channel_access_token: channelAccessToken,
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
  async sendMessage(message: string) {
    const line = await this.db("line").where({ id: 1 }).first();
    if (!line) return "systemError";

    const channelAccessToken = line.channel_access_token;
    const userId = line.user_id;
    const body = {
      to: userId,
      messages: [
        {
          type: "text",
          text: message,
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
    } catch (error: any) {
      if (error?.response) {
        const status = error.response.status;
        if (status === 429) {
          return "tooManyRequests";
        } else if (status === 400) {
          return "badRequest";
        }
      }
      return "systemError";
    }
  }
}
