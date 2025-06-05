import axios from "axios";
import crypto from "crypto";

const BASE_PUBLIC = "https://api.coin.z.com/public";
const BASE_PRIVATE = "https://api.coin.z.com/private";

export default class GmoApiService {
  private apiKey?: string;
  private secretKey?: string;

  constructor(params?: { apiKey?: string; secretKey?: string }) {
    this.apiKey = params?.apiKey;
    this.secretKey = params?.secretKey;
  }

  async fetchTradingPrice(symbol: string): Promise<string | undefined> {
    const path = `/v1/ticker?symbol=${symbol}`;
    try {
      const result = await axios.get(BASE_PUBLIC + path);
      if (!result?.data?.data.length) return undefined;
      return result.data.data[0].last;
    } catch (error) {
      return "systemError";
    }
  }

  async fetchTradingRateList() {
    const path = `/v1/ticker?symbol=`;
    try {
      const result = await axios.get(BASE_PUBLIC + path);
      if (!result?.data?.data.length) return [];
      return result.data.data;
    } catch (error) {
      return { status: "systemError" };
    }
  }

  private generateHeaders(method: "GET" | "POST", path: string, body = "") {
    if (!this.apiKey || !this.secretKey) {
      return;
    }
    const timestamp = Date.now().toString();
    const text = timestamp + method + path + body;
    const sign = crypto
      .createHmac("sha256", this.secretKey)
      .update(text)
      .digest("hex");

    return {
      "API-KEY": this.apiKey,
      "API-TIMESTAMP": timestamp,
      "API-SIGN": sign,
    };
  }

  async fetchAssets() {
    if (!this.apiKey || !this.secretKey) {
      return;
    }
    const path = "/v1/account/assets";
    const headers = this.generateHeaders("GET", path);
    try {
      const response = await axios.get(BASE_PRIVATE + path, { headers });
      return response.data;
    } catch (error) {
      return { status: "systemError" };
    }
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
    if (!this.apiKey || !this.secretKey) {
      return "missingKey";
    }
    const path = "/v1/order";
    const body = JSON.stringify({
      symbol,
      side,
      executionType: "LIMIT",
      timeInForce: "FAS",
      price,
      size,
    });
    const headers = this.generateHeaders("POST", path, body);
    try {
      const result = await axios.post(BASE_PRIVATE + path, body, { headers });
      const status = result?.status === 1 ? "success" : "failure";
      return { status };
    } catch (error) {
      return "systemError";
    }
  }
}
