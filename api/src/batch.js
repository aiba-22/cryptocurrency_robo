import axios from "axios";
import cron from "node-cron";
import { NotificationSettingService } from "./service/notificationSetting.js";
import { LineService } from "./service/line.js";
import { CoinCheckService } from "./service/coinCheck.js";

const sendLineNotifications = async () => {
  id = 1; //現状アカウント登録機能がついてないため、一つ目のIDを指定する。アカウント登録できるようになったら動的にする。
  const notificationSettingService = new NotificationSettingService();
  const lineService = new LineService();
  const notificationSetting = notificationSettingService.find(id);
  if (notificationSetting && notificationSetting.token) {
    const coinCheckService = new CoinCheckService();
    const priceListResult = await coinCheckService.getPriceList(
      notificationSetting.virtual_currency_type
    );

    const priceList = priceListResult.data;
    if (priceList.last < notificationSetting.target_price) {
      return;
    }
    const result = await lineService.sendNotification(id, priceList.last);
  }
};

// 1時間毎にLINE通知を送信するバッチ処理
cron.schedule("0 * * * *", sendLineNotifications);
