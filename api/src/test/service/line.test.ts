import LineService from "../../service/line";
import { LineRepository } from "../../db/repositories/lineRepository";
import db from "../../db/db";
import axios from "axios";

jest.mock("../../db/db", () => ({
  transaction: jest.fn().mockResolvedValue({
    commit: jest.fn(),
    rollback: jest.fn(),
  }),
}));

jest.mock("../../db/repositories/lineRepository");

describe("LineService", () => {
  let service: LineService;

  beforeEach(() => {
    service = new LineService();
    jest.clearAllMocks();
  });

  const mockLineData = {
    id: 1,
    channel_access_token: "channelAccessToken",
    user_id: "userId",
  };

  const setupRepositoryMock = (methods: Partial<LineRepository>) => {
    (LineRepository as jest.Mock).mockImplementation(() => methods);
  };

  describe("find", () => {
    it("正常にレコードが見つかれば、整形されたオブジェクトを返す", async () => {
      setupRepositoryMock({
        findById: jest.fn().mockResolvedValue(mockLineData),
      });

      const result = await service.find();
      expect(result).toEqual({
        id: 1,
        channelAccessToken: "channelAccessToken",
        userId: "userId",
      });
    });

    it("レコードが見つからない場合、undefinedを返す", async () => {
      setupRepositoryMock({ findById: jest.fn().mockResolvedValue(null) });

      const result = await service.find();
      expect(result).toBeUndefined();
    });
  });

  describe("create", () => {
    const params = {
      channelAccessToken: "channelAccessToken",
      userId: "userId",
    };

    it("作成成功時、'success'を返す", async () => {
      setupRepositoryMock({ create: jest.fn().mockResolvedValue(undefined) });
      const result = await service.create(params);
      expect(result).toBe("success");
    });

    it("作成失敗時、'failure'を返す", async () => {
      setupRepositoryMock({ create: jest.fn().mockRejectedValue(new Error()) });
      const result = await service.create(params);
      expect(result).toBe("failure");
    });
  });

  describe("update", () => {
    const params = {
      id: 1,
      channelAccessToken: "channelAccessToken",
      userId: "userId",
    };

    it("更新成功時、'success'を返す", async () => {
      setupRepositoryMock({ update: jest.fn().mockResolvedValue(undefined) });
      const result = await service.update(params);
      expect(result).toBe("success");
    });

    it("更新失敗時、'failure'を返す", async () => {
      setupRepositoryMock({ update: jest.fn().mockRejectedValue(new Error()) });
      const result = await service.update(params);
      expect(result).toBe("failure");
    });
  });

  describe("sendMessage", () => {
    const message = "test message";

    it("送信成功時、'success'を返す", async () => {
      setupRepositoryMock({
        findById: jest.fn().mockResolvedValue(mockLineData),
      });

      const axiosPostMock = jest.spyOn(axios, "post").mockResolvedValue({});

      const result = await service.sendMessage(message);

      expect(result).toBe("success");
      expect(axiosPostMock).toHaveBeenCalledWith(
        "https://api.line.me/v2/bot/message/push",
        {
          to: mockLineData.user_id,
          messages: [{ type: "text", text: message }],
        },
        {
          headers: {
            Authorization: `Bearer ${mockLineData.channel_access_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      axiosPostMock.mockRestore();
    });

    it("LINE設定が存在しない場合、'systemError'を返す", async () => {
      setupRepositoryMock({ findById: jest.fn().mockResolvedValue(null) });

      const result = await service.sendMessage(message);
      expect(result).toBe("systemError");
    });

    it("APIが 429 を返すと、'tooManyRequests'を返す", async () => {
      setupRepositoryMock({
        findById: jest.fn().mockResolvedValue(mockLineData),
      });

      const axiosPostMock = jest.spyOn(axios, "post").mockRejectedValue({
        response: { status: 429 },
      });

      const result = await service.sendMessage(message);
      expect(result).toBe("tooManyRequests");

      axiosPostMock.mockRestore();
    });

    it("APIが 400 を返すと、'badRequest'を返す", async () => {
      setupRepositoryMock({
        findById: jest.fn().mockResolvedValue(mockLineData),
      });

      const axiosPostMock = jest.spyOn(axios, "post").mockRejectedValue({
        response: { status: 400 },
      });

      const result = await service.sendMessage(message);
      expect(result).toBe("badRequest");

      axiosPostMock.mockRestore();
    });

    it("その他のエラー時、'systemError'を返す", async () => {
      setupRepositoryMock({
        findById: jest.fn().mockResolvedValue(mockLineData),
      });

      const axiosPostMock = jest
        .spyOn(axios, "post")
        .mockRejectedValue(new Error());

      const result = await service.sendMessage(message);
      expect(result).toBe("systemError");

      axiosPostMock.mockRestore();
    });
  });
});
