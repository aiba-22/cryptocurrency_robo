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
    try {
      const priceNotification = await this.db("price_notification")
        .where({ id })
        .first();
      const lineSettings = await this.db("line").where({ id }).first();

      if (!priceNotification || !lineSettings) {
        throw new Error("Notification setting not found.");
      }

      return {
        id: priceNotification.id,
        virtualCurrencyType: priceNotification.virtual_currency_type,
        targetPrice: priceNotification.target_price,
        lineToken: lineSettings.token,
      };
    } catch (error) {
      console.error("Error finding notification setting:", error);
      throw error;
    }
  }

  async create(virtualCurrencyType, targetPrice, lineToken) {
    const transaction = await this.db.transaction();
    try {
      await transaction("price_notification").insert({
        virtual_currency_type: virtualCurrencyType,
        target_price: targetPrice,
        created_at: new Date(),
        updated_at: new Date(),
      });

      await transaction("line").insert({
        token: lineToken,
        created_at: new Date(),
        updated_at: new Date(),
      });

      await transaction.commit();
      return "success";
    } catch (error) {
      await transaction.rollback();
      console.error("Error creating notification setting:", error);
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
      console.error("Error updating notification setting:", error);
      return "failure";
    }
  }
}

export default NotificationSettingService;
