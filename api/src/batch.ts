import cron from "node-cron";
import PriceAlert from "./service/priceAlert";
import Line from "./service/line";
import Gmo from "./service/gmo";

const notificationControllers = async () => {
  const id = 1; //現状アカウント登録機能がついてないため、一つ目のIDを指定する。アカウント登録できるようになったら複数配信にする。
  const priceAlertService = new PriceAlert();
  const lineService = new Line();
  const priceAlert = await priceAlertService.find(id);
  if (priceAlert) {
    const coinCheckService = new Gmo();
    const virtualCurrencyTradingPrice =
      await coinCheckService.fetchTradingPrice(
        priceAlert.conditions.cryptocurrencyType
      );

    const isPriceAlertTriggered = priceAlert.conditions.isUpperLimit
      ? virtualCurrencyTradingPrice.last < priceAlert.conditions.price
      : virtualCurrencyTradingPrice.last > priceAlert.conditions.price;
    if (isPriceAlertTriggered) {
      await lineService.send({ id, price: virtualCurrencyTradingPrice.last });
    }
  }
};

// 五分毎にLINE通知を送信するバッチ処理
cron.schedule("*/5 * * * *", notificationControllers);
