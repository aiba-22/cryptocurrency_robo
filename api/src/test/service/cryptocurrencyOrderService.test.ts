import CryptocurrencyOrderService from "../../service/cryptocurrencyOrderService";
import { CryptocurrencyOrderRepository } from "../../db/repositories/cryptocurrencyOrderRepository";

jest.mock("../../db/repositories/cryptocurrencyOrderRepository", () => {
  return {
    CryptocurrencyOrderRepository: jest.fn().mockImplementation(() => ({
      list: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    })),
  };
});

describe("cryptocurrencyOrderService", () => {
  let orderService: CryptocurrencyOrderService;

  const mockCommit = jest.fn().mockResolvedValue(undefined);
  const mockRollback = jest.fn().mockResolvedValue(undefined);
  const mockTransaction = {
    commit: mockCommit,
    rollback: mockRollback,
  };
  const mockDb = {
    transaction: jest.fn().mockResolvedValue(mockTransaction),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    orderService = new CryptocurrencyOrderService(mockDb as any);
  });

  describe("list", () => {
    it("注文リストが存在する場合、整形されたリストを返す", async () => {
      const mockList = jest.fn().mockResolvedValue([
        {
          id: 1,
          symbol: "btc",
          target_price: 50000,
          volume: 2,
          type: 1,
          is_enabled: 1,
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

    it("注文リストがない場合、undefinedを返す", async () => {
      const mockList = jest.fn().mockResolvedValue([]);
      (CryptocurrencyOrderRepository as jest.Mock).mockImplementation(() => ({
        list: mockList,
      }));

      const result = await orderService.list();

      expect(result).toBeUndefined();
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
        targetPrice: 60000,
        volume: 1,
        type: 0,
        isEnabled: 1,
      });

      expect(result).toBe("success");
      expect(mockCommit).toHaveBeenCalled();
    });

    it("注文作成時にエラーが発生した場合、'systemError'を返す", async () => {
      const mockCreate = jest.fn().mockRejectedValue(new Error());
      (CryptocurrencyOrderRepository as jest.Mock).mockImplementation(() => ({
        create: mockCreate,
      }));

      const result = await orderService.create({
        symbol: "eth",
        targetPrice: 2000,
        volume: 3,
        type: 1,
        isEnabled: 0,
      });

      expect(result).toBe("systemError");
      expect(mockRollback).toHaveBeenCalled();
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

      expect(result).toBe("success");
      expect(mockCommit).toHaveBeenCalled();
    });

    it("注文更新時にエラーが発生した場合、'systemError'を返す", async () => {
      const mockUpdate = jest.fn().mockRejectedValue(new Error("DB error"));
      (CryptocurrencyOrderRepository as jest.Mock).mockImplementation(() => ({
        update: mockUpdate,
      }));

      const result = await orderService.update({
        id: 2,
        symbol: "eth",
        targetPrice: 2500,
        volume: 1,
        type: 0,
        isEnabled: 1,
      });

      expect(result).toBe("systemError");
      expect(mockRollback).toHaveBeenCalled();
    });
  });
});
