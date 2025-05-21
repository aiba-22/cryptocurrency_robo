import LineService from "../service/lineService";
import LineApiService from "../service/lineApiService";

export const sendTestNotification = async (message: string) => {
  const lineService = new LineService();
  const line = await lineService.find();

  if (!line) return;

  const { lineUserId, channelAccessToken } = line;

  const lineApiService = new LineApiService({ lineUserId, channelAccessToken });
  try {
    await lineApiService.sendMessage(message);
    return "success";
  } catch (error) {
    return "failure";
  }
};
