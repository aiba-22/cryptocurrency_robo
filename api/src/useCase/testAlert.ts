import LineService from "../service/lineService";
import LineApiService from "../service/lineApiService";

export const testAlert = async (message: string) => {
  const lineService = new LineService();
  const line = await lineService.find();
  if (!line?.channelAccessToken || !line?.userId) return;
  const { userId, channelAccessToken } = line;

  const lineApiService = new LineApiService();
  try {
    await lineApiService.sendMessage({
      message,
      userId,
      channelAccessToken,
    });
    return "success";
  } catch (error) {
    return "failure";
  }
};
