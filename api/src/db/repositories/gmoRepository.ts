import db from "../db";

export class GmoRepository {
  private db;

  constructor(dbInstance = db) {
    this.db = dbInstance;
  }

  async findById(id: number) {
    return this.db("gmo").where({ id }).first();
  }

  async create({ apiKey, secretKey }: { apiKey: string; secretKey: string }) {
    return this.db("gmo").insert({
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
    return this.db("gmo").where({ id }).update({
      api_key: apiKey,
      secret_key: secretKey,
      updated_at: new Date(),
    });
  }
}
