import axios from "axios";
import { VIRTUAL_CURRENCIES } from "./constants.js";

export class CoinCheckService {
  async getPriceList(virtualCurrency) {
    const priceList = await axios.get(
      `https://coincheck.com/api/ticker?pair=${
        virtualCurrency || VIRTUAL_CURRENCIES.BTC_JPY
      }`
    );
    return priceList;
  }
}
