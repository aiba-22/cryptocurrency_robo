import axios from "axios";
import cron from "node-cron";
import { findNotificatioSetting } from "./service/notificatioSetting.js";
import { sendLineNotification } from "./service/line.js";

// バッチ処理の関数を定義
const sendLineNotifications = async () => {
  try {
    id = 1;
    const notificatioSetting = findNotificatioSetting(id);
    if (notificatioSetting && notificatioSetting.token) {
      // 現在の価格を取得
      const response = await axios.get(
        `https://coincheck.com/api/ticker?pair=${notificatioSetting.virtual_currency_type}`
      );
      const tickerData = response.data;
      if (tickerData.last < notificatioSetting.target_price) {
        return;
      }

      // LINEに通知を送信
      const result = await sendLineNotification(id, tickerData.last);
    }
  } catch (error) {
    console.error("システムエラー");
  }
};

// 1時間毎にLINE通知を送信するバッチ処理
cron.schedule("0 * * * *", sendLineNotifications);
