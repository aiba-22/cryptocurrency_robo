import GmoService from "../../service/gmoService";
import { GmoAccountRepository } from "../../db/repositories/gmoAccountRepository";
import { PrismaClient } from "@prisma/client";

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

jest.mock("../../db/repositories/gmoAccountRepository", () => {
  return {
    GmoAccountRepository: jest.fn().mockImplementation(() => ({})),
  };
});

describe("GmoService", () => {
  let gmoService: GmoService;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {}); // console.error抑制
    gmoService = new GmoService(mockPrisma);
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore(); // 元に戻す
  });

  describe("find", () => {
    it("GMO情報が存在する場合、整形して返す", async () => {
      const mockFindByUserId = jest.fn().mockResolvedValue({
        id: 1,
        apiKey: "apiKey",
        secretKey: "secretKey",
      });
      (GmoAccountRepository as jest.Mock).mockImplementation(() => ({
        findByUserId: mockFindByUserId,
      }));

      const result = await gmoService.find();

      expect(result).toEqual({
        id: 1,
        apiKey: "apiKey",
        secretKey: "secretKey",
      });
    });

    it("GMO情報が存在しない場合、undefinedを返す", async () => {
      const mockFindByUserId = jest.fn().mockResolvedValue(undefined);
      (GmoAccountRepository as jest.Mock).mockImplementation(() => ({
        findByUserId: mockFindByUserId,
      }));

      const result = await gmoService.find();

      expect(result).toBeUndefined();
    });
  });

  describe("create", () => {
    it("正常に作成できた場合、'success' を返す", async () => {
      const mockCreate = jest.fn().mockResolvedValue(undefined);
      (GmoAccountRepository as jest.Mock).mockImplementation(() => ({
        create: mockCreate,
      }));

      const result = await gmoService.create({
        apiKey: "key",
        secretKey: "secret",
      });

      expect(result).toEqual({ status: "success" });
    });

    it("作成失敗時、'systemError' を返す", async () => {
      const mockCreate = jest.fn().mockRejectedValue(new Error());
      (GmoAccountRepository as jest.Mock).mockImplementation(() => ({
        create: mockCreate,
      }));

      const result = await gmoService.create({
        apiKey: "key",
        secretKey: "secret",
      });

      expect(result).toEqual({ status: "systemError" });
    });
  });

  describe("update", () => {
    it("正常に更新できた場合、'success' を返す", async () => {
      const mockUpdate = jest.fn().mockResolvedValue(undefined);
      (GmoAccountRepository as jest.Mock).mockImplementation(() => ({
        update: mockUpdate,
      }));

      const result = await gmoService.update({
        id: 1,
        apiKey: "newKey",
        secretKey: "newSecret",
      });

      expect(result).toEqual({ status: "success" });
    });

    it("更新失敗時、'systemError' を返す", async () => {
      const mockUpdate = jest.fn().mockRejectedValue(new Error());
      (GmoAccountRepository as jest.Mock).mockImplementation(() => ({
        update: mockUpdate,
      }));

      const result = await gmoService.update({
        id: 1,
        apiKey: "key",
        secretKey: "secret",
      });

      expect(result).toEqual({ status: "systemError" });
    });
  });
});
