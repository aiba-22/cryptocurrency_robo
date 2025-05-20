import LineApiService from "../../service/lineApiService";
import axios from "axios";

describe("LineApiService", () => {
  let service: LineApiService;
  const message = "test_message";
  const channelAccessToken = "channel_access_token";
  const userId = "user_id";

  beforeEach(() => {
    service = new LineApiService();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("sendMessage", () => {
    it("送信成功時、'success'を返す", async () => {
      const axiosPostMock = jest.spyOn(axios, "post").mockResolvedValue({});

      const result = await service.sendMessage({
        message,
        channelAccessToken,
        userId,
      });

      expect(result).toBe("success");
      expect(axiosPostMock).toHaveBeenCalledWith(
        "https://api.line.me/v2/bot/message/push",
        {
          to: userId,
          messages: [{ type: "text", text: message }],
        },
        {
          headers: {
            Authorization: `Bearer ${channelAccessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
    });

    it("LINE設定が存在しない場合、'systemError'を返す", async () => {
      const result = await service.sendMessage({
        message,
        channelAccessToken,
        userId: "unknown_user",
      });
      expect(result).toBe("systemError");
    });

    const errorCases = [
      { status: 429, expected: "tooManyRequests" },
      { status: 400, expected: "badRequest" },
    ];

    errorCases.forEach(({ status, expected }) => {
      it(`APIが ${status} を返すと、'${expected}' を返す`, async () => {
        jest.spyOn(axios, "post").mockRejectedValue({ response: { status } });

        const result = await service.sendMessage({
          message,
          channelAccessToken,
          userId,
        });

        expect(result).toBe(expected);
      });
    });

    it("その他のエラー時、'systemError'を返す", async () => {
      jest.spyOn(axios, "post").mockRejectedValue(new Error("unexpected"));

      const result = await service.sendMessage({
        message,
        channelAccessToken,
        userId,
      });

      expect(result).toBe("systemError");
    });
  });
});
