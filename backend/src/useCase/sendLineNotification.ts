import LineService from "../service/lineService";
import LineApiService from "../service/lineApiService";

export const sendTestNotification = async (message: string) => {
  const lineService = new LineService();
  const line = await lineService.find();

  if (!line) return "systemError";

  const { lineUserId, channelAccessToken } = line;

  const lineApiService = new LineApiService({ lineUserId, channelAccessToken });
  const result = await lineApiService.sendMessage(message);
  return result;
};
