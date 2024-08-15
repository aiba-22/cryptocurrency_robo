const knex = require('knex');
const axios = require('axios');
const cron = require('node-cron');

// Knexの設定（server.jsと同様）
const db = knex({
  client: 'mysql2',
  connection: {
    host: 'localhost',  // Dockerコンテナ内でMySQLに接続
    user: 'root',
    password: 'password',
    database: 'mydatabase'
  }
});

// バッチ処理の関数を定義
const sendLineNotifications = async () => {
  console.log('Running batch job to send LINE notifications');

  try {
    // 全ての設定を取得
    const priceNotifications = await db('price_notification').select('*');
    const lineSettings = await db('line').select('*');

    for (let i = 0; i < priceNotifications.length; i++) {
      const notification = priceNotifications[i];
      const lineSetting = lineSettings.find(setting => setting.id === notification.id);

      if (lineSetting && lineSetting.token) {
        // 現在の価格を取得
        const response = await axios.get(`https://coincheck.com/api/ticker?pair=${notification.virtual_currency_type}`);
        const tickerData = response.data;
        if (tickerData.last < notification.target_price){
          return
        }
        // 通知メッセージを作成
        const message = `現在の価格は ${tickerData.last} です。目標価格: ${notification.target_price}`;
        // LINEに通知を送信
        await axios.post(
          'https://notify-api.line.me/api/notify',
          `message=${encodeURIComponent(message)}`,
          {
            headers: {
              Authorization: `Bearer ${lineSetting.token}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );

        console.log(`Notification sent for ID ${notification.id}`);
      }
    }
  } catch (error) {
    console.error('Error in batch job:', error);
  }
};

// 1時間毎にLINE通知を送信するバッチ処理
cron.schedule('0 * * * *', sendLineNotifications);


sendLineNotifications(); // すぐにバッチ処理を実行
