import axios from "axios";
import { LineRepository } from "../db/repositories/lineRepository";
import db from "../db/db";
import { USER_ID } from "./constants";

export default class LineService {
  async find() {
    const repository = new LineRepository();
    const line = await repository.findById(USER_ID);
    if (!line) return;
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
    const lineRepository = new LineRepository(transaction);
    try {
      await lineRepository.create({ channelAccessToken, userId });
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
    const lineRepository = new LineRepository(transaction);
    try {
      await lineRepository.update({ id, channelAccessToken, userId });
      await transaction.commit();
      return "success";
    } catch (error) {
      await transaction.rollback();
      return "failure";
    }
  }
}
