import axios from "axios";
import crypto from "crypto";
import db from "../db";

export default class gmoService {
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
        id: 1, //現状アカウント登録機能がついてないため、１のみを使用する想定
        api_key: apiKey,
        secret_key: secretKey,
        created_at: new Date(),
      });
      await transaction.commit();
      return "success";
    } catch (error) {
      await transaction.rollback();
      throw new Error();
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
      throw new Error();
    }
  }

  async fetchTradingPrice(symbol: string) {
    const endPoint = "https://api.coin.z.com/public";
    const path = `/v1/ticker?symbol=${symbol}`;
    const result = await axios.get(endPoint + path);
    return result.data;
  }

  async fetchTradingPriceList() {
    const endPoint = "https://api.coin.z.com/public";
    const path = `/v1/ticker?symbol=`;
    const result = await axios.get(endPoint + path);
    return result.data.data;
  }

  async fetchAssets({
    apiKey,
    secretKey,
  }: {
    apiKey: string;
    secretKey: string;
  }) {
    const timestamp = Date.now().toString();
    const method = "GET";
    const endPoint = "https://api.coin.z.com/private";
    const path = "/v1/account/assets";

    const text = timestamp + method + path;
    const sign = crypto
      .createHmac("sha256", secretKey)
      .update(text)
      .digest("hex");

    const options = {
      headers: {
        "API-KEY": apiKey,
        "API-TIMESTAMP": timestamp,
        "API-SIGN": sign,
      },
    };

    const response = await axios.get(endPoint + path, options);
    return response.data;
  }
}
