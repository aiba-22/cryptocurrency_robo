import cron from "node-cron";
import { NotificationSettingService } from "./service/notificationSetting";
import { LineService } from "./service/line";
import { CoinCheckService } from "./service/coinCheck";

const notificationControllers = async () => {
  const id = 1; //現状アカウント登録機能がついてないため、一つ目のIDを指定する。アカウント登録できるようになったら複数配信にする。
  const notificationSettingService = new NotificationSettingService();
  const lineService = new LineService();
  const notificationSetting = await notificationSettingService.find(id);
  if (notificationSetting) {
    const coinCheckService = new CoinCheckService();
    const virtualCurrencyTradingPrice =
      await coinCheckService.getTradingPrice();
    const isAboveTargetPrice =
      virtualCurrencyTradingPrice.last < notificationSetting.targetPrice;
    if (!isAboveTargetPrice) {
      return;
    }
    await lineService.send({ id, price: virtualCurrencyTradingPrice.last });
  }
};

// 五分毎にLINE通知を送信するバッチ処理
cron.schedule("*/5 * * * *", notificationControllers);
