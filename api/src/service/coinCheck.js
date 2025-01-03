import axios from "axios";
import { VIRTUAL_CURRENCIES } from "./constants.js";

export class CoinCheckService {
  async getPriceList(pair) {
    const priceList = await axios.get(
      `https://coincheck.com/api/ticker?pair=${
        pair || VIRTUAL_CURRENCIES.BTC_JPY
      }`
    );
    return priceList;
  }
}
