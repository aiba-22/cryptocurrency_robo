import LineApiService from "../../service/lineApiService";
import axios from "axios";

describe("LineApiService", () => {
  let lineApiService: LineApiService;
  const message = "test_message";
  const channelAccessToken = "channel_access_token";
  const lineUserId = "line_user_id";

  beforeEach(() => {
    lineApiService = new LineApiService({ channelAccessToken, lineUserId });
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("sendMessage", () => {
    it("送信成功時、'success'を返す", async () => {
      const axiosPostMock = jest.spyOn(axios, "post").mockResolvedValue({});

      const result = await lineApiService.sendMessage(message);

      expect(result).toEqual({ status: "success" });

      expect(axiosPostMock).toHaveBeenCalledWith(
        "https://api.line.me/v2/bot/message/push",
        {
          to: lineUserId,
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
      const result = await lineApiService.sendMessage(message);
      expect(result).toEqual({ status: "systemError" });
    });

    const errorCases = [
      { status: 429, expected: "tooManyRequests" },
      { status: 400, expected: "badRequest" },
    ];

    errorCases.forEach(({ status, expected }) => {
      it(`APIが ${status} を返すと、'${expected}' を返す`, async () => {
        jest.spyOn(axios, "post").mockRejectedValue({ response: { status } });

        const result = await lineApiService.sendMessage(message);

        expect(result).toEqual({ status: expected });
      });
    });

    it("その他のエラー時、'systemError'を返す", async () => {
      jest.spyOn(axios, "post").mockRejectedValue(new Error("unexpected"));

      const result = await lineApiService.sendMessage(message);

      expect(result).toEqual({ status: "systemError" });
    });
  });
});
