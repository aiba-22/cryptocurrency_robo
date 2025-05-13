import orderService from "../../service/cryptocurrencyOrder";
import { CryptocurrencyOrderRepository } from "../../db/repositories/cryptocurrencyOrderRepository";
import db from "../../db/db";

jest.mock("../../db/db", () => ({
  transaction: jest.fn(),
}));

jest.mock("../../db/repositories/cryptocurrencyOrderRepository");

describe("orderServiceのテスト", () => {
  let service: orderService;

  beforeEach(() => {
    service = new orderService();
    jest.clearAllMocks();
  });

  describe("listメソッド", () => {
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

      const result = await service.list();

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

    it("注文リストが空の場合、undefinedを返す", async () => {
      const mockList = jest.fn().mockResolvedValue([]);
      (CryptocurrencyOrderRepository as jest.Mock).mockImplementation(() => ({
        list: mockList,
      }));

      const result = await service.list();

      expect(result).toBeUndefined();
    });
  });

  describe("createメソッド", () => {
    it("注文作成が成功した場合、'success'を返す", async () => {
      const commit = jest.fn();
      const rollback = jest.fn();
      (db.transaction as jest.Mock).mockResolvedValue({ commit, rollback });

      const mockCreate = jest.fn().mockResolvedValue(undefined);
      (CryptocurrencyOrderRepository as jest.Mock).mockImplementation(() => ({
        create: mockCreate,
      }));

      const result = await service.create({
        symbol: "btc",
        targetPrice: 60000,
        volume: 1,
        type: 0,
        isEnabled: 1,
      });

      expect(result).toBe("success");
      expect(commit).toHaveBeenCalled();
    });

    it("注文作成時にエラーが発生した場合、'failure'を返す", async () => {
      const commit = jest.fn();
      const rollback = jest.fn();
      (db.transaction as jest.Mock).mockResolvedValue({ commit, rollback });

      const mockCreate = jest.fn().mockRejectedValue(new Error("DB Error"));
      (CryptocurrencyOrderRepository as jest.Mock).mockImplementation(() => ({
        create: mockCreate,
      }));

      const result = await service.create({
        symbol: "eth",
        targetPrice: 2000,
        volume: 3,
        type: 1,
        isEnabled: 0,
      });

      expect(result).toBe("failure");
      expect(rollback).toHaveBeenCalled();
    });
  });

  describe("updateメソッド", () => {
    it("注文更新が成功した場合、'success'を返す", async () => {
      const commit = jest.fn();
      const rollback = jest.fn();
      (db.transaction as jest.Mock).mockResolvedValue({ commit, rollback });

      const mockUpdate = jest.fn().mockResolvedValue(undefined);
      (CryptocurrencyOrderRepository as jest.Mock).mockImplementation(() => ({
        update: mockUpdate,
      }));

      const result = await service.update({
        id: 1,
        symbol: "btc",
        targetPrice: 50000,
        volume: 2,
        type: 1,
        isEnabled: 1,
      });

      expect(result).toBe("success");
      expect(commit).toHaveBeenCalled();
    });

    it("注文更新時にエラーが発生した場合、'failure'を返す", async () => {
      const commit = jest.fn();
      const rollback = jest.fn();
      (db.transaction as jest.Mock).mockResolvedValue({ commit, rollback });

      const mockUpdate = jest.fn().mockRejectedValue(new Error("DB error"));
      (CryptocurrencyOrderRepository as jest.Mock).mockImplementation(() => ({
        update: mockUpdate,
      }));

      const result = await service.update({
        id: 2,
        symbol: "eth",
        targetPrice: 2500,
        volume: 1,
        type: 0,
        isEnabled: 1,
      });

      expect(result).toBe("failure");
      expect(rollback).toHaveBeenCalled();
    });
  });
});
