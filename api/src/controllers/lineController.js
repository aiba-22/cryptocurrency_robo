import axios from "axios";
import { sendLineNotification } from "../service/line.js";

export const getTicker = async (req, res) => {
  try {
    const response = await axios.get(
      `https://coincheck.com/api/ticker?pair=${req.query.pair || "btc_jpy"}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
};

export const sendNotification = async (req, res) => {
  const { id, price } = req.body;
  try {
    const result = await sendLineNotification(id, price);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error sending LINE notification" });
  }
};
