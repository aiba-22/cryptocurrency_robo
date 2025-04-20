import axios from "axios";
import { VIRTUAL_CURRENCIES } from "./constants";

export class CoinCheckService {
  async getTradingPrice() {
    const virtualCurrencyTradingPrice = await axios.get(
      `https://coincheck.com/api/ticker?pair=${VIRTUAL_CURRENCIES.BTC_JPY}`
    );
    return virtualCurrencyTradingPrice.data;
  }
}
