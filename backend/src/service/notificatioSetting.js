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

export const findNotificatioSetting = async (id) => {
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

export const createNotificatioSetting = async (
  virtualCurrencyType,
  targetPrice,
  lineToken
) => {
  try {
    await db("price_notification").insert({
      virtual_currency_type: virtualCurrencyType,
      target_price: targetPrice,
      created_at: new Date(),
      updated_at: new Date(),
    });

    await db("line").insert({
      token: lineToken,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return "success";
  } catch (error) {
    console.error("システムエラー");
    return "failure";
  }
};

export const updateNotificatioSetting = async (
  id,
  virtualCurrencyType,
  targetPrice,
  lineToken
) => {
  try {
    await db("price_notification").where({ id }).update({
      virtual_currency_type: virtualCurrencyType,
      target_price: targetPrice,
      updated_at: new Date(),
    });

    await db("line").where({ id }).update({
      token: lineToken,
      updated_at: new Date(),
    });

    return "success";
  } catch (error) {
    console.error("システムエラー");
    return "failure";
  }
};
