import knex from "knex";

export class NotificationSettingService {
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
    const priceNotification = await this.db("price_notification")
      .where({ id })
      .first();
    const lineSettings = await this.db("line").where({ id }).first();

    return {
      id: priceNotification?.id || null,
      virtualCurrencyType: priceNotification?.virtual_currency_type || null,
      targetPrice: priceNotification?.target_price || null,
      lineToken: lineSettings?.channel_access_token || null,
      userId: lineSettings?.user_id || null,
    };
  }

  async create(virtualCurrencyType, targetPrice, lineToken, userId) {
    const transaction = await this.db.transaction();
    try {
      await transaction("price_notification").insert({
        virtual_currency_type: virtualCurrencyType,
        target_price: targetPrice,
        created_at: new Date(),
        updated_at: new Date(),
      });
      console.log(userId);
      await transaction("line").insert({
        channel_access_token: lineToken,
        user_id: userId,
        created_at: new Date(),
        updated_at: new Date(),
      });

      await transaction.commit();
      return "success";
    } catch (error) {
      await transaction.rollback();
      return "failure";
    }
  }

  async update(id, virtualCurrencyType, targetPrice, lineToken, userId) {
    const transaction = await this.db.transaction();
    try {
      await transaction("price_notification").where({ id }).update({
        virtual_currency_type: virtualCurrencyType,
        target_price: targetPrice,
        updated_at: new Date(),
      });

      await transaction("line").where({ id }).update({
        channel_access_token: lineToken,
        user_id: userId,
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

export default NotificationSettingService;
