import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { get, create, update } from "./controllers/targetPriceController.js";

import {
  get as getGmoSetting,
  create as createGmoSetting,
  update as updateGmoSetting,
} from "./controllers/gmoSettingController.js";

import { get as getLineSetting } from "./controllers/lineSettingController.js";

import { line } from "./controllers/notificationController.js";
import { get as getVirtualCurrency } from "./controllers/virtualCurrencyController.js";

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/api/lineSetting", getLineSetting);
app.get("/api/targetPrice", get);
app.post("/api/targetPrice/create", create);
app.put("/api/targetPrice/update", update);
app.get("/api/gmoSetting", getGmoSetting);
app.post("/api/gmoSetting/create", createGmoSetting);
app.put("/api/gmoSetting/update", updateGmoSetting);
app.get("/api/virtualCurrency", getVirtualCurrency);

app.post("/api/notification/line", line);

app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});
