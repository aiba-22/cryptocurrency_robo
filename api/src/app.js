import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {
  get,
  create,
  update,
} from "./controllers/notificationSettingController.js";
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
app.get("/api/virtualCurrency", getVirtualCurrency);
app.post("/api/line", sendNotification);

app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});
