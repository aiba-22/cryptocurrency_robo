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

const db = knex({
  client: 'mysql2',
  connection: {
    host: 'db',
    user: 'root',
    password: 'password',
    database: 'mydatabase'
  }
});

app.get('/api/settings', async (req, res) => {
const id = req.query.id;
  try {
    const priceotification = await db('price_notification')
      .where({ id })
      .first()

    const lineSettings = await db('line')
      .where({ id })
      .first()
    res.json({id: priceotification.id, virtualCurrencyType: priceotification.virtual_currency_type, targetPrice: priceotification.target_price, lineToken: lineSettings.token});
  } catch (error) {
    console.error('システムエラー');
  }
});

app.post('/api/settings/create', async (req, res) => {
  const { id, virtualCurrencyType,targetPrice, lineToken } = req.body;

  try {
    await db('price_notification').insert({
      virtual_currency_type: virtualCurrencyType,
      target_price: targetPrice,
      created_at: new Date(),
      updated_at: new Date()
    });

    await db('line').insert({
      token: lineToken,
      created_at: new Date(),
      updated_at: new Date()
    });

    res.status(200).json({ success: true});
  } catch (error) {
    console.error('Error creating settings:', error);
    res.status(500).json({ success: false, message: 'Failed to create settings' });
  }
});

app.put('/api/settings/update', async (req, res) => {
  const { id, virtualCurrencyType,targetPrice, lineToken } = req.body;

  try {
    await db('price_notification')
      .where({ id })
      .update({
        virtual_currency_type: virtualCurrencyType,
        target_price: targetPrice,
        updated_at: new Date()
      });

    await db('line')
      .where({ id })
      .update({
        token: lineToken,
        updated_at: new Date()
      });

    res.status(200).json({ success: true, message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ success: false, message: 'Failed to update settings' });
  }
});



app.get('/api/ticker', async (req, res) => {
  const pair = req.query.pair || 'btc_jpy';

  try {
    const response = await axios.get(`https://coincheck.com/api/ticker?pair=${pair}`);
    const tickerData = response.data;
    res.json(tickerData);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

app.post('/api/line', async (req, res) => {
  console.log("dfsdsdsdsd")
  const { id, price} = req.body;

  try {
    const settings = await db('line')
      .where({ id })
      .first();

    if (!settings || !settings.token) {
      return res.status(400).json({ success: false, message: 'No token found for the specified currency type.' });
    }

    const token = settings.token;

    await axios.post(
      'https://notify-api.line.me/api/notify',
      `message=${encodeURIComponent(price)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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
