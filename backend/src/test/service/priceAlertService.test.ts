import PriceAlertService from "../../service/priceAlertService";
import { CryptocurrencyPriceAlertRepository } from "../../db/repositories/cryptocurrencyPriceAlertRepository";
import { PrismaClient } from "@prisma/client";

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

jest.mock("../../db/repositories/cryptocurrencyPriceAlertRepository", () => {
  return {
    CryptocurrencyPriceAlertRepository: jest
      .fn()
      .mockImplementation(() => ({})),
  };
});

describe("PriceAlertService", () => {
  let priceAlertService: PriceAlertService;
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
    priceAlertService = new PriceAlertService(mockPrisma);
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

      (CryptocurrencyPriceAlertRepository as jest.Mock).mockImplementation(
        () => ({
          findByUserId: mockFindByUserId,
        })
      );

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

      (CryptocurrencyPriceAlertRepository as jest.Mock).mockImplementation(
        () => ({
          findByUserId: mockFindByUserId,
        })
      );

      const result = await priceAlertService.find();

      expect(result).toBeUndefined();
    });
  });

  describe("create", () => {
    it("作成が成功した場合、'success' を返す", async () => {
      const mockCreate = jest.fn().mockResolvedValue(undefined);

      (CryptocurrencyPriceAlertRepository as jest.Mock).mockImplementation(
        () => ({
          create: mockCreate,
        })
      );

      const result = await priceAlertService.create({
        price: 50000,
        isUpperLimit: false,
        symbol: "eth",
      });

      expect(result).toEqual({ status: "success" });
    });

    it("作成失敗時、'systemError' を返す", async () => {
      const mockCreate = jest.fn().mockRejectedValue(new Error());

      (CryptocurrencyPriceAlertRepository as jest.Mock).mockImplementation(
        () => ({
          create: mockCreate,
        })
      );

      const result = await priceAlertService.create({
        price: 50000,
        isUpperLimit: false,
        symbol: "eth",
      });

      expect(result).toEqual({ status: "systemError" });
    });
  });

  describe("update", () => {
    it("更新が成功した場合、'success' を返す", async () => {
      const mockUpdate = jest.fn().mockResolvedValue(undefined);

      (CryptocurrencyPriceAlertRepository as jest.Mock).mockImplementation(
        () => ({
          update: mockUpdate,
        })
      );

      const result = await priceAlertService.update({
        id: 1,
        conditions: {
          price: 70000,
          isUpperLimit: true,
          symbol: "btc",
        },
      });

      expect(result).toEqual({ status: "success" });
    });

    it("更新時にエラーが発生した場合、'systemError' を返す", async () => {
      const mockUpdate = jest.fn().mockRejectedValue(new Error());

      (CryptocurrencyPriceAlertRepository as jest.Mock).mockImplementation(
        () => ({
          update: mockUpdate,
        })
      );

      const result = await priceAlertService.update({
        id: 1,
        conditions: {
          price: 70000,
          isUpperLimit: true,
          symbol: "btc",
        },
      });

      expect(result).toEqual({ status: "systemError" });
    });
  });
});
