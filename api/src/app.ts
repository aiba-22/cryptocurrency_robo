import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {
  get as getPriceAlert,
  create as createPriceAlert,
  update as updatePriceAlert,
} from "./controllers/priceAlertController";

import {
  get as getGmo,
  create as createGmo,
  update as updateGmo,
} from "./controllers/gmoController";

import {
  get as getLine,
  create as createLine,
  update as updateLine,
} from "./controllers/lineController";

import { lineNotification } from "./controllers/notificationController";
import { get as getVirtualCurrencyRateList } from "./controllers/cryptocurrencyRateController";

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/api/line", getLine);
app.post("/api/line", createLine);
app.put("/api/line", updateLine);
app.get("/api/priceAlert", getPriceAlert);
app.post("/api/priceAlert", createPriceAlert);
app.put("/api/priceAlert", updatePriceAlert);
app.get("/api/gmo", getGmo);
app.post("/api/gmo", createGmo);
app.put("/api/gmo", updateGmo);
app.get("/api/VirtualCurrencyRateList", getVirtualCurrencyRateList);

app.post("/api/notification/line", lineNotification);

app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});
