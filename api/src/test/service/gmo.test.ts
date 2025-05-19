import GmoService from "../../service/gmo";
import db from "../../db/db";
import { GmoRepository } from "../../db/repositories/gmoRepository";
import axios from "axios";
import crypto from "crypto";

jest.mock("axios");
jest.mock("crypto");
jest.mock("../../db/db", () => ({
  transaction: jest.fn(),
}));
jest.mock("../../db/repositories/gmoRepository");

describe("GmoService", () => {
  let gmoService: GmoService;

  beforeEach(() => {
    gmoService = new GmoService();
    jest.clearAllMocks();
  });

  describe("find", () => {
    it("GMO情報が存在する場合、整形して返す", async () => {
      const mockFindById = jest.fn().mockResolvedValue({
        id: 1,
        api_key: "testKey",
        secret_key: "secretKey",
      });

      (GmoRepository as jest.Mock).mockImplementation(() => ({
        findById: mockFindById,
      }));

      const result = await gmoService.find();

      expect(result).toEqual({
        id: 1,
        apiKey: "testKey",
        secretKey: "secretKey",
      });
    });

    it("GMO情報が存在しない場合、undefinedを返す", async () => {
      const mockFindById = jest.fn().mockResolvedValue(undefined);

      (GmoRepository as jest.Mock).mockImplementation(() => ({
        findById: mockFindById,
      }));

      const result = await gmoService.find();

      expect(result).toBeUndefined();
    });
  });

  describe("create", () => {
    it("正常に作成できた場合、'success' を返す", async () => {
      const commit = jest.fn();
      const rollback = jest.fn();
      (db.transaction as jest.Mock).mockResolvedValue({ commit, rollback });

      const mockCreate = jest.fn().mockResolvedValue(undefined);

      (GmoRepository as jest.Mock).mockImplementation(() => ({
        create: mockCreate,
      }));

      const result = await gmoService.create({
        apiKey: "key",
        secretKey: "secret",
      });

      expect(result).toBe("success");
      expect(commit).toHaveBeenCalled();
    });

    it("作成失敗時、'failure' を返す", async () => {
      const commit = jest.fn();
      const rollback = jest.fn();
      (db.transaction as jest.Mock).mockResolvedValue({ commit, rollback });

      const mockCreate = jest.fn().mockRejectedValue(new Error("DB Error"));

      (GmoRepository as jest.Mock).mockImplementation(() => ({
        create: mockCreate,
      }));

      const result = await gmoService.create({
        apiKey: "key",
        secretKey: "secret",
      });

      expect(result).toBe("failure");
      expect(rollback).toHaveBeenCalled();
    });
  });

  describe("update", () => {
    it("正常に更新できた場合、'success' を返す", async () => {
      const commit = jest.fn();
      const rollback = jest.fn();
      (db.transaction as jest.Mock).mockResolvedValue({ commit, rollback });

      const mockUpdate = jest.fn().mockResolvedValue(undefined);

      (GmoRepository as jest.Mock).mockImplementation(() => ({
        update: mockUpdate,
      }));

      const result = await gmoService.update({
        id: 1,
        apiKey: "newKey",
        secretKey: "newSecret",
      });

      expect(result).toBe("success");
      expect(commit).toHaveBeenCalled();
    });

    it("更新失敗時、'failure' を返す", async () => {
      const commit = jest.fn();
      const rollback = jest.fn();
      (db.transaction as jest.Mock).mockResolvedValue({ commit, rollback });

      const mockUpdate = jest.fn().mockRejectedValue(new Error("DB Error"));

      (GmoRepository as jest.Mock).mockImplementation(() => ({
        update: mockUpdate,
      }));

      const result = await gmoService.update({
        id: 1,
        apiKey: "key",
        secretKey: "secret",
      });

      expect(result).toBe("failure");
      expect(rollback).toHaveBeenCalled();
    });
  });

  describe("fetchTradingPrice", () => {
    it("APIから価格情報が取得できた場合、lastを返す", async () => {
      (axios.get as jest.Mock).mockResolvedValue({
        data: { data: [{ last: "1000" }] },
      });

      const result = await gmoService.fetchTradingPrice("BTC");

      expect(result).toBe("1000");
    });

    it("データが空配列ならundefined", async () => {
      (axios.get as jest.Mock).mockResolvedValue({
        data: { data: [] },
      });

      const result = await gmoService.fetchTradingPrice("BTC");

      expect(result).toBeUndefined();
    });
  });

  describe("fetchTradingRateList", () => {
    it("APIから全ティッカーが取得できた場合、配列を返す", async () => {
      const mockData = [
        {
          symbol: "BTC",
          last: "1000",
          ask: "1010",
          bid: "990",
          high: "1100",
          low: "900",
          timestamp: "123456",
          volume: "50",
        },
      ];

      (axios.get as jest.Mock).mockResolvedValue({
        data: { data: mockData },
      });

      const result = await gmoService.fetchTradingRateList();

      expect(result).toEqual(mockData);
    });

    it("空データならundefined", async () => {
      (axios.get as jest.Mock).mockResolvedValue({ data: { data: [] } });

      const result = await gmoService.fetchTradingRateList();

      expect(result).toBeUndefined();
    });
  });

  describe("fetchAssets", () => {
    it("資産情報が取得できた場合、データを返す", async () => {
      const mockHmac = {
        update: jest.fn().mockReturnThis(),
        digest: jest.fn().mockReturnValue("signature"),
      };
      (crypto.createHmac as jest.Mock).mockReturnValue(mockHmac);

      (axios.get as jest.Mock).mockResolvedValue({ data: { assets: [] } });

      const result = await gmoService.fetchAssets({
        apiKey: "key",
        secretKey: "secret",
      });

      expect(result).toEqual({ assets: [] });
    });
  });

  describe("order", () => {
    it("注文成功時に'success'を返す", async () => {
      const mockFindById = jest.fn().mockResolvedValue({
        id: 1,
        api_key: "api",
        secret_key: "secret",
      });

      (GmoRepository as jest.Mock).mockImplementation(() => ({
        findById: mockFindById,
      }));

      const mockHmac = {
        update: jest.fn().mockReturnThis(),
        digest: jest.fn().mockReturnValue("signed"),
      };
      (crypto.createHmac as jest.Mock).mockReturnValue(mockHmac);

      (axios.post as jest.Mock).mockResolvedValue({ status: 1 });

      const result = await gmoService.order({
        symbol: "BTC",
        side: "BUY",
        price: 1000,
        size: 0.01,
      });

      expect(result).toBe("success");
    });

    it("注文失敗時に'failure'を返す", async () => {
      const mockFindById = jest.fn().mockResolvedValue({
        id: 1,
        api_key: "api",
        secret_key: "secret",
      });

      (GmoRepository as jest.Mock).mockImplementation(() => ({
        findById: mockFindById,
      }));

      (axios.post as jest.Mock).mockResolvedValue({ status: 0 });

      const result = await gmoService.order({
        symbol: "BTC",
        side: "SELL",
        price: 900,
        size: 0.02,
      });

      expect(result).toBe("failure");
    });
  });
});
