import axios from "axios";
import crypto from "crypto";
export default class GmoApiService {
  async fetchTradingPrice(symbol: string): Promise<
    | {
        ask: string;
        bid: string;
        high: string;
        last: string;
        low: string;
        symbol: string;
        timestamp: string;
        volume: string;
      }[]
    | undefined
  > {
    const endPoint = "https://api.coin.z.com/public";
    const path = `/v1/ticker?symbol=${symbol}`;
    try {
      const result = await axios.get(endPoint + path);
      if (result?.data?.data.length === 0) {
        return;
      }
      return result.data.data[0].last;
    } catch (error) {}
  }

  async fetchTradingRateList(): Promise<
    | {
        ask: string;
        bid: string;
        high: string;
        last: string;
        low: string;
        symbol: string;
        timestamp: string;
        volume: string;
      }[]
    | undefined
  > {
    const endPoint = "https://api.coin.z.com/public";
    const path = `/v1/ticker?symbol=`;
    try {
      const result = await axios.get(endPoint + path);
      if (result?.data?.data.length === 0) {
        return;
      }
      return result.data.data;
    } catch (error) {}
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
    try {
      const response = await axios.get(endPoint + path, options);
      if (!response?.data) return;
      return response.data;
    } catch (error) {}
  }

  async order({
    symbol,
    side,
    price,
    size,
    secretKey,
    apiKey,
  }: {
    symbol: string;
    side: string;
    price: number;
    size: number;
    secretKey: string;
    apiKey: string;
  }) {
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
    try {
      const result = await axios.post(endPoint + path, reqBody, options);
      if (result?.status === 1) {
        return "success";
      } else {
        return "failure";
      }
    } catch (error) {
      return "failure";
    }
  }
}
