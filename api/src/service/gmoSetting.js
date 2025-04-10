import knex from "knex";

export class GmoSettingService {
  constructor() {
    this.db = knex({
      client: "mysql2",
      connection: {
        host: "db",
        user: "root",
        password: "password",
        database: "mydatabase",
      },
    });
  }

  async find(id) {
    const gmo = await this.db("gmo").where({ id }).first();

    return {
      id: gmo?.id || null,
      apiKey: gmo?.api_key || null,
      secretKey: gmo?.secret_key || null,
    };
  }

  async create(apiKey, secretKey) {
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

  async update(id, virtualCurrencyType, targetPrice, lineToken) {
    const transaction = await this.db.transaction();
    try {
      await transaction("price_notification").where({ id }).update({
        virtual_currency_type: virtualCurrencyType,
        target_price: targetPrice,
        updated_at: new Date(),
      });

      await transaction("line").where({ id }).update({
        token: lineToken,
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
