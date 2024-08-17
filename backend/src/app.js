import express from "express";
import axios from "axios";
import cors from "cors";
import bodyParser from "body-parser";
import {
  findNotificatioSetting,
  createNotificatioSetting,
  updateNotificatioSetting,
} from "./service/notificatioSetting.js";
import { sendLineNotification } from "./service/line.js";

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/api/settings", async (req, res) => {
  const id = req.query.id;
  const notificatioSetting = await findNotificatioSetting(id);
  res.json(notificatioSetting);
});

app.post("/api/settings/create", async (req, res) => {
  const { virtualCurrencyType, targetPrice, lineToken } = req.body;
  const result = createNotificatioSetting(
    virtualCurrencyType,
    targetPrice,
    lineToken
  );
  res.status(200).json(result);
});

app.put("/api/settings/update", async (req, res) => {
  const { id, virtualCurrencyType, targetPrice, lineToken } = req.body;
  const result = updateNotificatioSetting(
    id,
    virtualCurrencyType,
    targetPrice,
    lineToken
  );
  res.status(200).json(result);
});

app.get("/api/ticker", async (req, res) => {
  try {
    const response = await axios.get(
      `https://coincheck.com/api/ticker?pair=${req.query.pair || "btc_jpy"}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});

app.post("/api/line", async (req, res) => {
  const { id, price } = req.body;
  const result = await sendLineNotification(id, price);
  res.status(200).json(result);
});

app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});
