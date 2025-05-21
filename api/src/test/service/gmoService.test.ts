import GmoService from "../../service/gmoService";
import { GmoRepository } from "../../db/repositories/gmoRepository";

jest.mock("../../db/db", () => ({
  transaction: jest.fn(),
}));

jest.mock("../../db/repositories/gmoRepository", () => {
  return {
    GmoRepository: jest.fn().mockImplementation(() => ({
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    })),
  };
});

describe("GmoService", () => {
  let gmoService: GmoService;

  const mockCommit = jest.fn();
  const mockRollback = jest.fn();
  const mockTransaction = {
    commit: mockCommit,
    rollback: mockRollback,
  };
  const mockDb = {
    transaction: jest.fn().mockResolvedValue(mockTransaction),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    gmoService = new GmoService(mockDb as any);
  });

  describe("find", () => {
    it("GMO情報が存在する場合、整形して返す", async () => {
      const mockFindById = jest.fn().mockResolvedValue({
        id: 1,
        api_key: "apiKey",
        secret_key: "secretKey",
      });
      (GmoRepository as jest.Mock).mockImplementation(() => ({
        findById: mockFindById,
      }));

      const result = await gmoService.find();

      expect(result).toEqual({
        id: 1,
        apiKey: "apiKey",
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
      const mockCreate = jest.fn().mockResolvedValue(undefined);
      (GmoRepository as jest.Mock).mockImplementation(() => ({
        create: mockCreate,
      }));

      const result = await gmoService.create({
        apiKey: "key",
        secretKey: "secret",
      });

      expect(result).toBe("success");
      expect(mockCommit).toHaveBeenCalled();
    });

    it("作成失敗時、'failure' を返す", async () => {
      const mockCreate = jest.fn().mockRejectedValue(new Error());
      (GmoRepository as jest.Mock).mockImplementation(() => ({
        create: mockCreate,
      }));

      const result = await gmoService.create({
        apiKey: "key",
        secretKey: "secret",
      });

      expect(result).toBe("failure");
      expect(mockRollback).toHaveBeenCalled();
    });
  });

  describe("update", () => {
    it("正常に更新できた場合、'success' を返す", async () => {
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
      expect(mockCommit).toHaveBeenCalled();
    });

    it("更新失敗時、'failure' を返す", async () => {
      const mockUpdate = jest.fn().mockRejectedValue(new Error());
      (GmoRepository as jest.Mock).mockImplementation(() => ({
        update: mockUpdate,
      }));

      const result = await gmoService.update({
        id: 1,
        apiKey: "key",
        secretKey: "secret",
      });

      expect(result).toBe("failure");
      expect(mockRollback).toHaveBeenCalled();
    });
  });
});
