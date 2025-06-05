import LineService from "../../service/lineService";
import { LineRepository } from "../../db/repositories/lineRepository";
import { PrismaClient } from "@prisma/client";

jest.mock("../../db/repositories/lineRepository", () => {
  return {
    LineRepository: jest.fn().mockImplementation(() => ({})),
  };
});

const mockTransaction = jest.fn(async (callback) => {
  return callback({
    findByUserId: jest.fn().mockResolvedValue(undefined),
    create: jest.fn().mockResolvedValue(undefined),
    update: jest.fn().mockResolvedValue(undefined),
  });
});
const mockPrisma = {
  $transaction: mockTransaction,
} as unknown as PrismaClient;

describe("LineService", () => {
  let lineService: LineService;

  beforeEach(() => {
    jest.clearAllMocks();

    lineService = new LineService(mockPrisma);
  });

  describe("find", () => {
    it("正常にレコードが見つかれば、整形されたオブジェクトを返す", async () => {
      const mockFindByUserId = jest.fn().mockResolvedValue({
        id: 1,
        channelAccessToken: "channelAccessToken",
        lineUserId: "lineUserId",
      });
      (LineRepository as jest.Mock).mockImplementation(() => ({
        findByUserId: mockFindByUserId,
      }));

      const result = await lineService.find();
      expect(result).toEqual({
        id: 1,
        channelAccessToken: "channelAccessToken",
        lineUserId: "lineUserId",
      });
    });

    it("レコードが見つからない場合、undefinedを返す", async () => {
      const mockFindByUserId = jest.fn().mockResolvedValue(undefined);
      (LineRepository as jest.Mock).mockImplementation(() => ({
        findByUserId: mockFindByUserId,
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

    it("作成成功時、{ status: 'success' } を返す", async () => {
      const mockCreate = jest.fn().mockResolvedValue(undefined);
      (LineRepository as jest.Mock).mockImplementation(() => ({
        create: mockCreate,
      }));

      const result = await lineService.create(params);
      expect(result).toEqual({ status: "success" });
    });

    it("作成失敗時、{ status: 'systemError' } を返す", async () => {
      (LineRepository as jest.Mock).mockImplementation(() => ({
        create: jest.fn().mockRejectedValue(new Error("DB Error")),
      }));

      const result = await lineService.create(params);
      expect(result).toEqual({ status: "systemError" });
    });
  });

  describe("update", () => {
    const params = {
      id: 1,
      channelAccessToken: "channelAccessToken",
      lineUserId: "userId",
    };

    it("更新成功時、{ status: 'success' } を返す", async () => {
      (LineRepository as jest.Mock).mockImplementation(() => ({
        update: jest.fn().mockResolvedValue(undefined),
      }));

      const result = await lineService.update(params);
      expect(result).toEqual({ status: "success" });
    });

    it("更新失敗時、{ status: 'systemError' } を返す", async () => {
      (LineRepository as jest.Mock).mockImplementation(() => ({
        update: jest.fn().mockRejectedValue(new Error("DB Error")),
      }));

      const result = await lineService.update(params);
      expect(result).toEqual({ status: "systemError" });
    });
  });
});
