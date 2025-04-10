import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {
  get,
  create,
  update,
} from "./controllers/notificationSettingController.js";

import {
  get as getGmoSetting,
  create as createGmoSetting,
  update as updateGmoSetting,
} from "./controllers/gmoSettingController.js";

import { sendNotification } from "./controllers/lineController.js";
import { get as getVirtualCurrency } from "./controllers/virtualCurrencyController.js";

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/api/notificationSetting", get);
app.post("/api/notificationSetting/create", create);
app.put("/api/notificationSetting/update", update);
app.get("/api/gmoSetting", getGmoSetting);
app.post("/api/gmoSetting/create", createGmoSetting);
app.put("/api/gmoSetting/update", updateGmoSetting);
app.get("/api/virtualCurrency", getVirtualCurrency);
// app.get("/api/virtualCurrency", (req, res) => {
//   res.json({ symbol: "BTC", price: 123456 });
// });
app.post("/api/line", sendNotification);

app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});
