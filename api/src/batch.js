import axios from "axios";
import cron from "node-cron";
import { findNotificatioSetting } from "./service/notificatioSetting.js";
import { sendLineNotification } from "./service/line.js";

const sendLineNotifications = async () => {
  try {
    id = 1; //現状複数配信に対応してないので仮で設定
    const notificatioSetting = findNotificatioSetting(id);
    if (notificatioSetting && notificatioSetting.token) {
      const response = await axios.get(
        `https://coincheck.com/api/ticker?pair=${notificatioSetting.virtual_currency_type}`
      );
      const tickerData = response.data;
      if (tickerData.last < notificatioSetting.target_price) {
        return;
      }

      const result = await sendLineNotification(id, tickerData.last);
    }
  } catch (error) {
    console.error("システムエラー");
  }
};

// 1時間毎にLINE通知を送信するバッチ処理
cron.schedule("0 * * * *", sendLineNotifications);
