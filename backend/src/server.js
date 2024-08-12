const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const lineToken = 'nuSURsNVn9O2Y4yHf5FwPu3xpmCDKPuc1QIo1yf7dW9'; // LINE Notifyのトークンをここに設定

app.get('/api/ticker', async (req, res) => {
  const pair = req.query.pair || 'btc_jpy'; // デフォルトは 'btc_jpy'

  try {
    const response = await axios.get(`https://coincheck.com/api/ticker?pair=${pair}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

app.post('/api/line', async (req, res) => {
  const { message } = req.body;

  try {
    await axios.post(
      'https://notify-api.line.me/api/notify',
      `message=${encodeURIComponent(message)}`,
      {
        headers: {
          Authorization: `Bearer ${lineToken}`,
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
