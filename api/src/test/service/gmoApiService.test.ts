import GmoApiService from "../../service/GmoApiService";
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

describe("GmoApiService", () => {
  let gmoService: GmoApiService;

  beforeEach(() => {
    gmoService = new GmoApiService();
    jest.clearAllMocks();
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
        secretKey: "secretKey",
        apiKey: "apiKey",
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
        secretKey: "secretKey",
        apiKey: "apiKey",
      });

      expect(result).toBe("failure");
    });
  });
});
