import knex from "knex";

const db = knex({
  client: "mysql2",
  connection: {
    host: "db",
    user: "root",
    password: "password",
    database: "mydatabase",
  },
});

export const findNotificationSetting = async (id) => {
  try {
    const priceotification = await db("price_notification")
      .where({ id })
      .first();

    const lineSettings = await db("line").where({ id }).first();
    return {
      id: priceotification.id,
      virtualCurrencyType: priceotification.virtual_currency_type,
      targetPrice: priceotification.target_price,
      lineToken: lineSettings.token,
    };
  } catch (error) {
    console.error("システムエラー");
  }
};

export const createNotificationSetting = async (
  virtualCurrencyType,
  targetPrice,
  lineToken
) => {
  const transaction = await db.transaction();
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
    console.error("システムエラー");
    return "failure";
  }
};

export const updateNotificationSetting = async (
  id,
  virtualCurrencyType,
  targetPrice,
  lineToken
) => {
  const transaction = await db.transaction();
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
    console.error("システムエラー");
    return "failure";
  }
};
