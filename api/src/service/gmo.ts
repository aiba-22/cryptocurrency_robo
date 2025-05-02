import axios from "axios";
import crypto from "crypto";
import db from "../db";

export default class GmoService {
  db;
  constructor() {
    this.db = db;
  }

  async find() {
    const gmo = await this.db("gmo").where({ id: 1 }).first(); //アカウント機能はつけない想定なのでid固定
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
        id: 1, //アカウント機能はつけない想定なので固定
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
      return "failure";
    }
  }

  async fetchTradingPrice(symbol: string) {
    const endPoint = "https://api.coin.z.com/public";
    const path = `/v1/ticker?symbol=${symbol}`;
    const result = await axios.get(endPoint + path);
    return result.data.data[0].last;
  }

  async fetchTradingRateList(): Promise<
    {
      ask: string;
      bid: string;
      high: string;
      last: string;
      low: string;
      symbol: string;
      timestamp: string;
      volume: string;
    }[]
  > {
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

  async order({
    symbol,
    side,
    price,
    size,
  }: {
    symbol: string;
    side: string;
    price: number;
    size: number;
  }) {
    console.log(symbol, side, price, size);
    const { id, api_key, secret_key } = await this.db("gmo")
      .where({ id: 1 }) //アカウント機能はつけない想定なのでid固定
      .first();
    if (!id) return;

    const timestamp = Date.now().toString();
    const method = "POST";
    const endPoint = "https://api.coin.z.com/private";
    const path = "/v1/order";
    const reqBody = JSON.stringify({
      symbol,
      side,
      executionType: "LIMIT",
      timeInForce: "FAS",
      price,
      size,
    });
    const text = timestamp + method + path + reqBody;
    const sign = crypto
      .createHmac("sha256", secret_key)
      .update(text)
      .digest("hex");
    const options = {
      headers: {
        "API-KEY": api_key,
        "API-TIMESTAMP": timestamp,
        "API-SIGN": sign,
      },
    };
    try {
      const result = await axios.post(endPoint + path, reqBody, options);
      return result.data;
    } catch (error) {
      return "failure";
    }
  }
}
