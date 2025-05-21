import db from "../db";

export class LineRepository {
  private db;

  constructor(dbInstance = db) {
    this.db = dbInstance;
  }

  async findById(userId: number) {
    return await this.db("line").where({ user_id: userId }).first();
  }

  async create({
    userId,
    channelAccessToken,
    lineUserId,
  }: {
    channelAccessToken: string;
    userId: number;
    lineUserId: string;
  }) {
    await this.db("line").insert({
      channel_access_token: channelAccessToken,
      user_id: userId,
      line_user_id: lineUserId,
      created_at: new Date(),
    });
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
    await this.db("line").where({ id }).update({
      channel_access_token: channelAccessToken,
      line_user_id: lineUserId,
      updated_at: new Date(),
    });
  }
}
