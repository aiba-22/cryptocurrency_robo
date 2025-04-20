import db from "../db";

export class NotificationSettingService {
  db;
  constructor() {
    this.db = db;
  }

  async find(id: number) {
    const priceNotification = await this.db("price_notification")
      .where({ id })
      .first();

    return {
      id: priceNotification?.id || null,
      virtualCurrencyType: priceNotification?.virtual_currency_type || null,
      targetPrice: priceNotification?.target_price || null,
    };
  }

  async create({
    virtualCurrencyType,
    targetPrice,
    lineToken,
    userId,
  }: {
    virtualCurrencyType: string;
    targetPrice: number;
    lineToken: string;
    userId: string;
  }) {
    const transaction = await this.db.transaction();
    try {
      await transaction("price_notification").insert({
        virtual_currency_type: virtualCurrencyType,
        target_price: targetPrice,
        created_at: new Date(),
      });
      await transaction("line").insert({
        channel_access_token: lineToken,
        user_id: userId,
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
    virtualCurrencyType,
    targetPrice,
    lineToken,
    userId,
  }: {
    id: number;
    virtualCurrencyType: string;
    targetPrice: number;
    lineToken: string;
    userId: string;
  }) {
    const transaction = await this.db.transaction();
    try {
      await transaction("price_notification").where({ id }).update({
        virtual_currency_type: virtualCurrencyType,
        target_price: targetPrice,
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
