import axios from "axios";
import { LineRepository } from "../db/repositories/lineRepository";
import db from "../db/db";
import { USER_ID } from "./constants";

export default class LineService {
  private db;
  constructor(dbInstance = db) {
    this.db = dbInstance;
  }
  async find() {
    const repository = new LineRepository();
    const line = await repository.findByUserId(USER_ID);
    if (!line) return;
    return {
      id: line.id,
      channelAccessToken: line.channel_access_token,
      lineUserId: line.line_user_id,
    };
  }

  async create({
    channelAccessToken,
    lineUserId,
  }: {
    channelAccessToken: string;
    lineUserId: string;
  }) {
    const transaction = await this.db.transaction();
    const lineRepository = new LineRepository(transaction);
    try {
      await lineRepository.create({
        userId: USER_ID,
        channelAccessToken,
        lineUserId,
      });
      await transaction.commit();
      return "success";
    } catch (error) {
      await transaction.rollback();
      return "systemError";
    }
  }

  async update({
    id,
    channelAccessToken,
    lineUserId,
  }: {
    id: number;
    channelAccessToken: string;
    lineUserId: string;
  }) {
    const transaction = await this.db.transaction();
    const lineRepository = new LineRepository(transaction);
    try {
      await lineRepository.update({ id, channelAccessToken, lineUserId });
      await transaction.commit();
      return "success";
    } catch (error) {
      await transaction.rollback();
      return "systemError";
    }
  }
}
