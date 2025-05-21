// service/lineApiService.ts
import axios from "axios";

export default class LineApiService {
  private channelAccessToken: string;
  private lineUserId: string;

  constructor({
    channelAccessToken,
    lineUserId,
  }: {
    channelAccessToken: string;
    lineUserId: string;
  }) {
    this.channelAccessToken = channelAccessToken;
    this.lineUserId = lineUserId;
  }

  async sendMessage(message: string): Promise<string> {
    try {
      await axios.post(
        "https://api.line.me/v2/bot/message/push",
        {
          to: this.lineUserId,
          messages: [{ type: "text", text: message }],
        },
        {
          headers: {
            Authorization: `Bearer ${this.channelAccessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return "success";
    } catch (error: any) {
      if (error?.response?.status === 429) {
        return "tooManyRequests";
      }
      if (error?.response?.status === 400) {
        return "badRequest";
      }
      return "systemError";
    }
  }
}
