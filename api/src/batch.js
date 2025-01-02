import axios from "axios";
import cron from "node-cron";
import { NotificationSettingService } from "./service/notificationSetting.js";
import { LineService } from "./service/line.js";

const sendLineNotifications = async () => {
  try {
    id = 1; //現状複数配信に対応してないので仮で設定
    const notificationSettingService = new NotificationSettingService();
    const lineService = new LineService();
    const notificationSetting = notificationSettingService.find(id);
    if (notificationSetting && notificationSetting.token) {
      const response = await axios.get(
        `https://coincheck.com/api/ticker?pair=${notificationSetting.virtual_currency_type}`
      );
      const tickerData = response.data;
      if (tickerData.last < notificationSetting.target_price) {
        return;
      }

      const result = await lineService.sendNotification(id, tickerData.last);
    }
  } catch (error) {
    console.error("システムエラー");
  }
};

// 1時間毎にLINE通知を送信するバッチ処理
cron.schedule("0 * * * *", sendLineNotifications);
