import db from "../db";

export class GmoSettingService {
  db;
  constructor() {
    this.db = db;
  }

  async find(id: number) {
    const gmo = await this.db("gmo").where({ id }).first();

    return {
      id: gmo?.id || null,
      apiKey: gmo?.api_key || null,
      secretKey: gmo?.secret_key || null,
    };
  }

  async create({ apiKey, secretKey }: { apiKey: string; secretKey: string }) {
    const transaction = await this.db.transaction();
    try {
      await transaction("gmo").insert({
        id: 1,
        api_key: apiKey,
        secret_key: secretKey,
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
    apiKey,
    secretKey,
  }: {
    id: number;
    apiKey: string;
    secretKey: string;
  }) {
    const transaction = await this.db.transaction();
    try {
      await transaction("gmo").where({ id }).update({
        api_key: apiKey,
        secret_key: secretKey,
        updated_at: new Date(),
      });

      await transaction.commit();
      return "success";
    } catch (error) {
      await transaction.rollback();
      return "failure";
    }
  }
}

export default GmoSettingService;
