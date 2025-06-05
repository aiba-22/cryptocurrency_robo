import { PrismaClient } from "@prisma/client";
import { CryptocurrencyOrderRepository } from "../../db/repositories/cryptocurrencyOrderRepository";
import CryptocurrencyOrderService from "../../service/cryptocurrencyOrderService";

const mockRepoInstance = {
  list: jest.fn(),
  findByIdAndUserId: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
};

jest.mock("../../db/repositories/cryptocurrencyOrderRepository", () => {
  return {
    CryptocurrencyOrderRepository: jest.fn(() => mockRepoInstance),
  };
});

const mockTransaction = jest.fn(async (callback) => {
  return callback({
    update: jest.fn().mockResolvedValue(undefined),
    create: jest.fn().mockResolvedValue(undefined),
    list: jest.fn().mockResolvedValue([]),
  });
});

const mockPrisma = {
  $transaction: mockTransaction,
} as unknown as PrismaClient;

describe("cryptocurrencyOrderService", () => {
  let orderService: CryptocurrencyOrderService;
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
    orderService = new CryptocurrencyOrderService(mockPrisma);
  });

  describe("list", () => {
    it("注文リストが存在する場合、整形されたリストを返す", async () => {
      mockRepoInstance.list.mockResolvedValue([
        {
          id: 1,
          symbol: "btc",
          targetPrice: 50000,
          volume: 2,
          type: 1,
          isEnabled: 1,
        },
      ]);

      const result = await orderService.list();

      expect(result).toEqual([
        {
          id: 1,
          symbol: "btc",
          targetPrice: 50000,
          volume: 2,
          type: 1,
          isEnabled: 1,
        },
      ]);
    });

    it("注文リストがない場合、空配列を返す", async () => {
      mockRepoInstance.list.mockResolvedValue([]);

      const result = await orderService.list();

      expect(result).toEqual([]);
    });
  });

  describe("create", () => {
    it("注文作成が成功した場合、'success'を返す", async () => {
      mockRepoInstance.create.mockResolvedValue(undefined);

      const result = await orderService.create({
        symbol: "btc",
        targetPrice: 50000,
        volume: 2,
        type: 1,
        isEnabled: 1,
      });

      expect(result).toEqual({ status: "success" });
    });

    it("注文作成時にエラーが発生した場合、'systemError'を返す", async () => {
      mockRepoInstance.create.mockRejectedValue(new Error());

      const result = await orderService.create({
        symbol: "eth",
        targetPrice: 2500,
        volume: 1,
        type: 0,
        isEnabled: 1,
      });

      expect(result).toEqual({ status: "systemError" });
    });
  });

  describe("update", () => {
    it("注文更新が成功した場合、'success'を返す", async () => {
      mockRepoInstance.update.mockResolvedValue(undefined);

      const result = await orderService.update({
        id: 1,
        symbol: "btc",
        targetPrice: 50000,
        volume: 2,
        type: 1,
        isEnabled: 1,
      });

      expect(result).toEqual({ status: "success" });
    });

    it("注文更新時にエラーが発生した場合、'systemError'を返す", async () => {
      mockRepoInstance.update.mockRejectedValue(new Error());

      const result = await orderService.update({
        id: 2,
        symbol: "eth",
        targetPrice: 2500,
        volume: 1,
        type: 0,
        isEnabled: 1,
      });

      expect(result).toEqual({ status: "systemError" });
    });
  });
});
