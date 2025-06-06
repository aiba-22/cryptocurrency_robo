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

import { sendLineTest } from "./controllers/notificationController";
import { get as getVirtualCurrencyRateList } from "./controllers/cryptocurrencyRateController";

import {
  list as listCryptocurrencyStaticOrder,
  create as createCryptocurrencyStaticOrder,
  update as updateCryptocurrencyStaticOrder,
} from "./controllers/cryptocurrencyStaticOrderController";

import {
  create as createCryptocurrencyAdjustmentOrder,
  update as updateCryptocurrencyAdjustmentOrder,
  get as getCryptocurrencyStaticOrder,
} from "./controllers/cryptocurrencyAdjustmentOrderController";
import { asyncHandler } from "./ utils/asyncHandler";

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/api/line", asyncHandler(getLine));
app.post("/api/line", asyncHandler(createLine));
app.put("/api/line", asyncHandler(updateLine));

app.get("/api/priceAlert", asyncHandler(getPriceAlert));
app.post("/api/priceAlert", asyncHandler(createPriceAlert));
app.put("/api/priceAlert", asyncHandler(updatePriceAlert));

app.get("/api/gmo", asyncHandler(getGmo));
app.post("/api/gmo", asyncHandler(createGmo));
app.put("/api/gmo", asyncHandler(updateGmo));

app.get(
  "/api/VirtualCurrencyRateList",
  asyncHandler(getVirtualCurrencyRateList)
);

app.post("/api/notification/sendLineTest", asyncHandler(sendLineTest));

app.get(
  "/api/cryptocurrencyStaticOrder/list",
  asyncHandler(listCryptocurrencyStaticOrder)
);
app.post(
  "/api/cryptocurrencyStaticOrder",
  asyncHandler(createCryptocurrencyStaticOrder)
);
app.put(
  "/api/cryptocurrencyStaticOrder",
  asyncHandler(updateCryptocurrencyStaticOrder)
);

app.get(
  "/api/cryptocurrencyAdjustmentOrder",
  asyncHandler(getCryptocurrencyStaticOrder)
);
app.post(
  "/api/cryptocurrencyAdjustmentOrder",
  asyncHandler(createCryptocurrencyAdjustmentOrder)
);
app.put(
  "/api/cryptocurrencyAdjustmentOrder",
  asyncHandler(updateCryptocurrencyAdjustmentOrder)
);

app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error("Error occurred:", err);
    res.status(500).json({ message: "systemError" });
  }
);

app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});
