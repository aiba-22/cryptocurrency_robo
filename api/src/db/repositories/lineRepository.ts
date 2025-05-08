import db from "../db";

export class LineRepository {
  private db;

  constructor() {
    this.db = db;
  }

  async findById(id: number) {
    return await this.db("line").where({ id }).first();
  }

  async create(channelAccessToken: string, userId: string) {
    this.db("line").insert({
      channel_access_token: channelAccessToken,
      user_id: userId,
      created_at: new Date(),
    });
  }

  async update(id: number, channelAccessToken: string, userId: string) {
    this.db("line").where({ id }).update({
      channel_access_token: channelAccessToken,
      user_id: userId,
      updated_at: new Date(),
    });
  }
}
