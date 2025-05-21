import { userInfo } from "os";
import db from "../db";

export class GmoRepository {
  private db;

  constructor(dbInstance = db) {
    this.db = dbInstance;
  }

  async findById(userId: number) {
    return await this.db("gmo").where({ user_id: userId }).first();
  }

  async create({
    userId,
    apiKey,
    secretKey,
  }: {
    userId: number;
    apiKey: string;
    secretKey: string;
  }) {
    await this.db("gmo").insert({
      user_id: userId,
      api_key: apiKey,
      secret_key: secretKey,
      created_at: new Date(),
    });
  }

  async update({
    id,
    apiKey,
    secretKey,
  }: {
    id: number;
    apiKey: string;
    secretKey: string;
  }) {
    await this.db("gmo").where({ id }).update({
      api_key: apiKey,
      secret_key: secretKey,
      updated_at: new Date(),
    });
  }
}
