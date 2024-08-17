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
    const settings = await db("line").where({ id }).first();

    if (!settings || !settings.token) {
      return "failure";
    }
    if (price < settings.target_price) {
      return "下限価格に達していません";
    }
    const token = settings.token;
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
