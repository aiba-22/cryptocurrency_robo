import { PrismaClient } from "@prisma/client";
import { CryptocurrencyOrderRepository } from "../../db/repositories/cryptocurrencyOrderRepository";
import CryptocurrencyOrderService from "../../service/cryptocurrencyOrderService";

jest.mock("../../db/repositories/cryptocurrencyOrderRepository", () => {
  return {
    CryptocurrencyOrderRepository: jest.fn().mockImplementation(() => ({})),
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

  beforeEach(() => {
    jest.clearAllMocks();
    orderService = new CryptocurrencyOrderService(mockPrisma);
  });

  describe("list", () => {
    it("注文リストが存在する場合、整形されたリストを返す", async () => {
      const mockList = jest.fn().mockResolvedValue([
        {
          id: 1,
          symbol: "btc",
          targetPrice: 50000,
          volume: 2,
          type: 1,
          isEnabled: 1,
        },
      ]);
      (CryptocurrencyOrderRepository as jest.Mock).mockImplementation(() => ({
        list: mockList,
      }));

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
      const mockList = jest.fn().mockResolvedValue([]);
      (CryptocurrencyOrderRepository as jest.Mock).mockImplementation(() => ({
        list: mockList,
      }));

      const result = await orderService.list();

      expect(result).toEqual([]);
    });
  });

  describe("create", () => {
    it("注文作成が成功した場合、'success'を返す", async () => {
      const mockCreate = jest.fn().mockResolvedValue(undefined);
      (CryptocurrencyOrderRepository as jest.Mock).mockImplementation(() => ({
        create: mockCreate,
      }));

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
      const mockCreate = jest.fn().mockRejectedValue(new Error());
      (CryptocurrencyOrderRepository as jest.Mock).mockImplementation(() => ({
        create: mockCreate,
      }));

      mockTransaction.mockImplementation(async (callback) => {
        return callback({
          update: mockCreate,
        });
      });
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
      const mockUpdate = jest.fn().mockResolvedValue(undefined);
      (CryptocurrencyOrderRepository as jest.Mock).mockImplementation(() => ({
        update: mockUpdate,
      }));

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
      const mockUpdate = jest.fn().mockRejectedValue(new Error());
      (CryptocurrencyOrderRepository as jest.Mock).mockImplementation(() => ({
        update: mockUpdate,
      }));

      mockTransaction.mockImplementation(async (callback) => {
        return callback({
          update: mockUpdate,
        });
      });

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
