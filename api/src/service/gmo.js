import axios from "axios";
import crypto from "crypto";

export class GmoService {
  async getTradingPrice() {
    const endPoint = "https://api.coin.z.com/public";
    const path = `/v1/ticker?symbol=`;

    const result = await axios.get(endPoint + path);
    return result.data;
  }

  async fetchAssets(gmo) {
    const apiKey = gmo.api_key;
    const secretKey = gmo.secret_key;
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
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
