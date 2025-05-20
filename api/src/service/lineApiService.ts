import axios from "axios";

export default class LineApiService {
  async sendMessage({
    message,
    userId,
    channelAccessToken,
  }: {
    message: string;
    userId: string;
    channelAccessToken: string;
  }) {
    const body = {
      to: userId,
      messages: [{ type: "text", text: message }],
    };

    try {
      await axios.post("https://api.line.me/v2/bot/message/push", body, {
        headers: {
          Authorization: `Bearer ${channelAccessToken}`,
          "Content-Type": "application/json",
        },
      });
      return "success";
    } catch (error: any) {
      const status = error?.response?.status;
      if (status === 429) return "tooManyRequests";
      if (status === 400) return "badRequest";
      return "systemError";
    }
  }
}
