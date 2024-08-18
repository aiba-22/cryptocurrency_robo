import knex from "knex";
import axios from "axios";

const db = knex({
  client: "mysql2",
  connection: {
    host: "db",
    user: "root",
    password: "password",
    database: "mydatabase",
  },
});

export const sendLineNotification = async (id, price) => {
  try {
    const line = await db("line").where({ id }).first();
    const settings = await db("price_notification").where({ id }).first();
    if (!line.token || price > settings.target_price) {
      return "failure";
    }
    const token = line.token;
    const message = `目標価格に達しました。現在の価格は${price}円です。`;
    await axios.post(
      "https://notify-api.line.me/api/notify",
      `message=${encodeURIComponent(message)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return "success";
  } catch (error) {
    return "failure";
  }
};
