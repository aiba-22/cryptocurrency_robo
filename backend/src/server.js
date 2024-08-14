const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const knex = require('knex');
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const lineToken = 'nuSURsNVn9O2Y4yHf5FwPu3xpmCDKPuc1QIo1yf7dW9'; // LINE Notifyのトークンをここに設定

// Knexの設定
const db = knex({
  client: 'mysql2',
  connection: {
    host: 'db',  // Dockerコンテナ内でMySQLに接続
    user: 'root',
    password: 'password',
    database: 'mydatabase'
  }
});

// 通知設定のコントローラー
app.post('/api/settings', async (req, res) => {
  const { currency_type, target_price } = req.body;

  try {
    const existingRecord = await db('notification_settings')
      .where({ currency_type })
      .first();

    if (existingRecord) {
      // 既に存在する場合は更新
      await db('notification_settings')
        .where({ id: existingRecord.id })
        .update({
          target_price,
          updated_at: new Date()
        });
    } else {
      // 存在しない場合は新規作成
      await db('notification_settings').insert({
        currency_type,
        target_price,
        created_at: new Date(),
        updated_at: new Date()
      });
    }

    res.status(200).json({ success: true, message: 'Settings saved successfully' });
  } catch (error) {
    console.error('Error saving settings:', error);
    res.status(500).json({ success: false, message: 'Failed to save settings' });
  }
});

app.get('/api/ticker', async (req, res) => {
  const pair = req.query.pair || 'btc_jpy'; // デフォルトは 'btc_jpy'

  try {
    const response = await axios.get(`https://coincheck.com/api/ticker?pair=${pair}`);
    const tickerData = response.data;
    res.json(tickerData);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});
app.post('/api/line', async (req, res) => {
  const { message } = req.body;
  const token = req.headers.authorization; // Authorizationヘッダーからトークンを取得

  if (!token) {
    return res.status(400).json({ success: false, message: 'Authorization token is required.' });
  }

  try {
    await axios.post(
      'https://notify-api.line.me/api/notify',
      `message=${encodeURIComponent(message)}`,
      {
        headers: {
          Authorization: token, // ヘッダーから取得したトークンを使用
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    res.status(200).json({ success: true, message: 'Notification sent successfully' });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ success: false, message: 'Failed to send notification' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});
