import axios from "axios";
import { LineRepository } from "../db/repositories/lineRepository";
import { ID } from "./constants";
import db from "../db/db";

export default class LineService {
  private repository: LineRepository;
  constructor() {
    this.repository = new LineRepository();
  }

  async find() {
    const line = await this.repository.findById(ID);
    if (!line) return undefined;

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
    const transaction = await db.transaction();
    try {
      await this.repository.create(channelAccessToken, userId);
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
    const transaction = await db.transaction();
    try {
      await this.repository.update(id, channelAccessToken, userId);
      await transaction.commit();
      return "success";
    } catch (error) {
      await transaction.rollback();
      return "failure";
    }
  }

  async sendMessage(message: string) {
    const line = await this.repository.findById(ID);
    if (!line) return "systemError";

    const { channel_access_token, user_id } = line;

    const body = {
      to: user_id,
      messages: [{ type: "text", text: message }],
    };

    try {
      await axios.post("https://api.line.me/v2/bot/message/push", body, {
        headers: {
          Authorization: `Bearer ${channel_access_token}`,
          "Content-Type": "application/json",
        },
      });
      return "success";
    } catch (error: any) {
      const status = error?.response?.status;
      if (status === 429) return "tooManyRequests";
      if (status === 400) return "badRequest";
      return "systemError";
    }
  }
}
