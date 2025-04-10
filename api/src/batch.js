import cron from "node-cron";
import { NotificationSettingService } from "./service/notificationSetting.js";
import { LineService } from "./service/line.js";
import { CoinCheckService } from "./service/coinCheck.js";

const notificationControllers = async () => {
  const id = 1; //現状アカウント登録機能がついてないため、一つ目のIDを指定する。アカウント登録できるようになったら複数配信にする。
  const notificationSettingService = new NotificationSettingService();
  const lineService = new LineService();
  const notificationSetting = await notificationSettingService.find(id);
  if (notificationSetting) {
    const coinCheckService = new CoinCheckService();
    const virtualCurrencyTradingPrice = await coinCheckService.getTradingPrice(
      notificationSetting.virtualCurrencyType
    );
    const isAboveTargetPrice =
      virtualCurrencyTradingPrice.last < notificationSetting.targetPrice;
    if (!isAboveTargetPrice) {
      return;
    }
    await lineService.send(id, virtualCurrencyTradingPrice.last);
  }
};

// 五分毎にLINE通知を送信するバッチ処理
cron.schedule("*/5 * * * *", notificationControllers);
