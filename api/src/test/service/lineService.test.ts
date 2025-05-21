import LineService from "../../service/lineService";
import { LineRepository } from "../../db/repositories/lineRepository";

jest.mock("../../db/db", () => ({
  transaction: jest.fn(),
}));

jest.mock("../../db/repositories/lineRepository", () => {
  return {
    LineRepository: jest.fn().mockImplementation(() => ({
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    })),
  };
});

describe("LineService", () => {
  let lineService: LineService;

  const mockCommit = jest.fn();
  const mockRollback = jest.fn();
  const mockTransaction = {
    commit: mockCommit,
    rollback: mockRollback,
  };
  const mockDb = {
    transaction: jest.fn().mockResolvedValue(mockTransaction),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    lineService = new LineService(mockDb as any);
  });

  describe("find", () => {
    it("正常にレコードが見つかれば、整形されたオブジェクトを返す", async () => {
      const mockFindById = jest.fn().mockResolvedValue({
        id: 1,
        channel_access_token: "channelAccessToken",
        line_user_id: "lineUserId",
      });
      (LineRepository as jest.Mock).mockImplementation(() => ({
        findById: mockFindById,
      }));

      const result = await lineService.find();
      expect(result).toEqual({
        id: 1,
        channelAccessToken: "channelAccessToken",
        lineUserId: "lineUserId",
      });
    });

    it("レコードが見つからない場合、undefinedを返す", async () => {
      const mockFindById = jest.fn().mockResolvedValue(undefined);
      (LineRepository as jest.Mock).mockImplementation(() => ({
        findById: mockFindById,
      }));
      const result = await lineService.find();
      expect(result).toBeUndefined();
    });
  });

  describe("create", () => {
    const params = {
      channelAccessToken: "channelAccessToken",
      lineUserId: "lineUserId",
    };

    it("作成成功時、'success'を返す", async () => {
      const mockCreate = jest.fn().mockResolvedValue(undefined);
      (LineRepository as jest.Mock).mockImplementation(() => ({
        create: mockCreate,
      }));

      const result = await lineService.create(params);
      expect(result).toBe("success");
    });

    it("作成失敗時、'failure'を返す", async () => {
      const mockCreate = jest.fn().mockRejectedValue(new Error());
      (LineRepository as jest.Mock).mockImplementation(() => ({
        create: mockCreate,
      }));

      const result = await lineService.create(params);
      expect(result).toBe("failure");
    });
  });

  describe("update", () => {
    const params = {
      id: 1,
      channelAccessToken: "channelAccessToken",
      lineUserId: "userId",
    };

    it("更新成功時、'success'を返す", async () => {
      const mockCreate = jest.fn().mockResolvedValue(undefined);
      (LineRepository as jest.Mock).mockImplementation(() => ({
        update: mockCreate,
      }));

      const result = await lineService.update(params);
      expect(result).toBe("success");
    });

    it("更新失敗時、'failure'を返す", async () => {
      const mockCreate = jest.fn().mockRejectedValue(new Error());
      (LineRepository as jest.Mock).mockImplementation(() => ({
        update: mockCreate,
      }));

      const result = await lineService.update(params);
      expect(result).toBe("failure");
    });
  });
});
