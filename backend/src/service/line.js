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
    await axios.post(
      "https://notify-api.line.me/api/notify",
      `message=${encodeURIComponent(price)}`,
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
