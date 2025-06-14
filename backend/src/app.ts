import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import lineAccountRouter from "./routes/lineAccountRouter";
import priceAlertRouter from "./routes/priceAlertRouter";
import gmoAccountRouter from "./routes/gmoAccountRouter";
import cryptocurrencyStaticOrderRouter from "./routes/cryptocurrencyStaticOrderRouter";
import cryptocurrencyAdjustmentOrderRouter from "./routes/cryptocurrencyAdjustmentOrderRouter";
import notificationRouter from "./routes/notificationRouter";
import cryptocurrencyRateRouter from "./routes/cryptocurrencyRateRouter";

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/lineAccount", lineAccountRouter);
app.use("/api/priceAlert", priceAlertRouter);
app.use("/api/gmoAccount", gmoAccountRouter);
app.use("/api/cryptocurrencyStaticOrder", cryptocurrencyStaticOrderRouter);
app.use(
  "/api/cryptocurrencyAdjustmentOrder",
  cryptocurrencyAdjustmentOrderRouter
);
app.use("/api/notification", notificationRouter);
app.use("/api/cryptocurrencyRateList", cryptocurrencyRateRouter);

app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});
