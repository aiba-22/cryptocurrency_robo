import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {
  get as getTargetPrice,
  create as createTargetPrice,
  update as updateTargetPrice,
} from "./controllers/targetPriceController";

import {
  get as getGmoSetting,
  create as createGmoSetting,
  update as updateGmoSetting,
} from "./controllers/gmoSettingController";

import { get as getLineSetting } from "./controllers/lineSettingController";

import { line } from "./controllers/notificationController";
import { get as getVirtualCurrencyRateList } from "./controllers/VirtualCurrencyRateController";

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/api/lineSetting", getLineSetting);
app.get("/api/targetPrice", getTargetPrice);
app.post("/api/targetPrice", createTargetPrice);
app.put("/api/targetPrice", updateTargetPrice);
app.get("/api/gmoSetting", getGmoSetting);
app.post("/api/gmoSetting", createGmoSetting);
app.put("/api/gmoSetting", updateGmoSetting);
app.get("/api/VirtualCurrencyRateList", getVirtualCurrencyRateList);

app.post("/api/notification/line", line);

app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});
