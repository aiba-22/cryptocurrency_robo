import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {
  getSettings,
  createSettings,
  updateSettings,
} from "./controllers/settingsController.js";
import { getTicker, sendNotification } from "./controllers/lineController.js";

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/api/settings", getSettings);
app.post("/api/settings/create", createSettings);
app.put("/api/settings/update", updateSettings);
app.get("/api/ticker", getTicker);
app.post("/api/line", sendNotification);

app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});
