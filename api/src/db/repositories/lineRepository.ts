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
    channelAccessToken,
    userId,
  }: {
    channelAccessToken: string;
    userId: string;
  }) {
    await this.db("line").insert({
      channel_access_token: channelAccessToken,
      user_id: userId,
      created_at: new Date(),
    });
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
    await this.db("line").where({ id }).update({
      channel_access_token: channelAccessToken,
      user_id: userId,
      updated_at: new Date(),
    });
  }
}
