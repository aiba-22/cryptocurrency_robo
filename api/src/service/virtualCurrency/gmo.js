import axios from "axios";
import { VIRTUAL_CURRENCIES } from "./constants.js";

export class GmoService {
  async getTradingPrice(virtualCurrency) {
    const endPoint = "https://api.coin.z.com/public";
    const path = `/v1/ticker?symbol=`;

    const result = await axios.get(endPoint + path);
    console.log(result.data);
    return result.data;
  }
}
