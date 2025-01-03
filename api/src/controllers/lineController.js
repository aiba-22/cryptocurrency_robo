import axios from "axios";
import { LineService } from "../service/line.js";
import { CoinCheckService } from "../service/coinCheck.js";

export const getTicker = async (req, res) => {
  const coinCheckService = new CoinCheckService();
  const result = await coinCheckService.getPriceList(req.query.pair);
  res.json(result.data);
};

export const sendNotification = async (req, res) => {
  const lineService = new LineService();
  const { id, price } = req.body;
  const result = await lineService.sendNotification(id, price);
  res.status(200).json(result);
};
