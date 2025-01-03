import { LineService } from "../service/line.js";

export const sendNotification = async (req, res) => {
  const lineService = new LineService();
  const { id, price } = req.body;
  const result = await lineService.sendNotification(id, price);
  res.status(200).json(result);
};
