import axios from "axios";
import { LineService } from "../service/line.js";

export const getTicker = async (req, res) => {
  const response = await axios.get(
    `https://coincheck.com/api/ticker?pair=${req.query.pair || "btc_jpy"}`
  );
  res.json(response.data);
};

export const sendNotification = async (req, res) => {
  const lineService = new LineService();
  const { id, price } = req.body;
  const result = await lineService.sendNotification(id, price);
  res.status(200).json(result);
};
