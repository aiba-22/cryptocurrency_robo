import PriceAlertService from "../../service/priceAlertService";
import db from "../../db/db";
import { PriceAlertRepository } from "../../db/repositories/priceAlertRepository";

jest.mock("../../db/db", () => ({
  transaction: jest.fn(),
}));

jest.mock("../../db/repositories/priceAlertRepository");

describe("PriceAlertService", () => {
  let priceAlertService: PriceAlertService;

  beforeEach(() => {
    priceAlertService = new PriceAlertService();
    jest.clearAllMocks();
  });

  describe("find", () => {
    it("条件アラートが存在する場合、整形されたオブジェクトを返す", async () => {
      const mockFindByUserId = jest.fn().mockResolvedValue({
        id: 1,
        conditions: {
          price: 10000,
          isUpperLimit: true,
          symbol: "btc",
        },
      });

      (PriceAlertRepository as jest.Mock).mockImplementation(() => ({
        findByUserId: mockFindByUserId,
      }));

      const result = await priceAlertService.find();

      expect(result).toEqual({
        id: 1,
        conditions: {
          price: 10000,
          isUpperLimit: true,
          symbol: "btc",
        },
      });
    });

    it("条件アラートが存在しない場合、undefinedを返す", async () => {
      const mockFindByUserId = jest.fn().mockResolvedValue(undefined);

      (PriceAlertRepository as jest.Mock).mockImplementation(() => ({
        findByUserId: mockFindByUserId,
      }));

      const result = await priceAlertService.find();

      expect(result).toBeUndefined();
    });
  });

  describe("create", () => {
    it("作成が成功した場合、'success' を返す", async () => {
      const commit = jest.fn();
      const rollback = jest.fn();
      (db.transaction as jest.Mock).mockResolvedValue({ commit, rollback });

      const mockCreate = jest.fn().mockResolvedValue(undefined);

      (PriceAlertRepository as jest.Mock).mockImplementation(() => ({
        create: mockCreate,
      }));

      const result = await priceAlertService.create({
        price: 50000,
        isUpperLimit: true,
        symbol: "btc",
      });

      expect(result).toBe("success");
      expect(commit).toHaveBeenCalled();
    });

    it("作成時にエラーが発生した場合、'systemError' を返す", async () => {
      const commit = jest.fn();
      const rollback = jest.fn();
      (db.transaction as jest.Mock).mockResolvedValue({ commit, rollback });

      const mockCreate = jest.fn().mockRejectedValue(new Error());

      (PriceAlertRepository as jest.Mock).mockImplementation(() => ({
        create: mockCreate,
      }));

      const result = await priceAlertService.create({
        price: 50000,
        isUpperLimit: false,
        symbol: "eth",
      });

      expect(result).toBe("systemError");
      expect(rollback).toHaveBeenCalled();
    });
  });

  describe("update", () => {
    it("更新が成功した場合、'success' を返す", async () => {
      const commit = jest.fn();
      const rollback = jest.fn();
      (db.transaction as jest.Mock).mockResolvedValue({ commit, rollback });

      const mockUpdate = jest.fn().mockResolvedValue(undefined);

      (PriceAlertRepository as jest.Mock).mockImplementation(() => ({
        update: mockUpdate,
      }));

      const result = await priceAlertService.update({
        id: 1,
        conditions: {
          price: 60000,
          isUpperLimit: false,
          symbol: "eth",
        },
      });

      expect(result).toBe("success");
      expect(commit).toHaveBeenCalled();
    });

    it("更新時にエラーが発生した場合、'systemError' を返す", async () => {
      const commit = jest.fn();
      const rollback = jest.fn();
      (db.transaction as jest.Mock).mockResolvedValue({ commit, rollback });

      const mockUpdate = jest.fn().mockRejectedValue(new Error("Update error"));

      (PriceAlertRepository as jest.Mock).mockImplementation(() => ({
        update: mockUpdate,
      }));

      const result = await priceAlertService.update({
        id: 1,
        conditions: {
          price: 70000,
          isUpperLimit: true,
          symbol: "btc",
        },
      });

      expect(result).toBe("systemError");
      expect(rollback).toHaveBeenCalled();
    });
  });
});
