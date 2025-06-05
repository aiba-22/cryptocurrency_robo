import LineService from "../../service/lineService";
import { LineAccountRepository } from "../../db/repositories/lineAccountRepository";
import { PrismaClient } from "@prisma/client";

jest.mock("../../db/repositories/lineAccountRepository", () => {
  return {
    LineAccountRepository: jest.fn().mockImplementation(() => ({})),
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
  let consoleErrorSpy: jest.SpyInstance;
  let consoleLogSpy: jest.SpyInstance;

  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });

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
      (LineAccountRepository as jest.Mock).mockImplementation(() => ({
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
      (LineAccountRepository as jest.Mock).mockImplementation(() => ({
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
      (LineAccountRepository as jest.Mock).mockImplementation(() => ({
        create: mockCreate,
      }));

      const result = await lineService.create(params);
      expect(result).toEqual({ status: "success" });
    });

    it("作成失敗時、{ status: 'systemError' } を返す", async () => {
      (LineAccountRepository as jest.Mock).mockImplementation(() => ({
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
      (LineAccountRepository as jest.Mock).mockImplementation(() => ({
        update: jest.fn().mockResolvedValue(undefined),
      }));

      const result = await lineService.update(params);
      expect(result).toEqual({ status: "success" });
    });

    it("更新失敗時、{ status: 'systemError' } を返す", async () => {
      (LineAccountRepository as jest.Mock).mockImplementation(() => ({
        update: jest.fn().mockRejectedValue(new Error("DB Error")),
      }));

      const result = await lineService.update(params);
      expect(result).toEqual({ status: "systemError" });
    });
  });
});
