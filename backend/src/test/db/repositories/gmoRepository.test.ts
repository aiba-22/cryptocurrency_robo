import { GmoRepository } from "../../../db/repositories/gmoRepository";

describe("GmoRepository", () => {
  describe("findByUserId", () => {
    const userId = 1;

    it("findFirstが成功した場合、対象のオブジェクトを返す。", async () => {
      const mockData = {
        id: 1,
        userId: 1,
        apiKey: "apiKey",
        secretKey: "secretKey",
        createdAt: new Date("2024-01-01T00:00:00Z"),
      };

      const findFirstMock = jest.fn().mockResolvedValue(mockData);
      const prismaMock = {
        gmo: {
          findFirst: findFirstMock,
        },
      };

      const repository = new GmoRepository(prismaMock as any);
      const result = await repository.findByUserId(userId);

      expect(findFirstMock).toHaveBeenCalledWith({ where: { userId } });
      expect(result).toEqual(mockData);
    });

    it("findFirstが失敗した場合、例外をスローする", async () => {
      const findFirstMock = jest.fn().mockRejectedValue(new Error("DB error"));
      const prismaMock = {
        gmo: {
          findFirst: findFirstMock,
        },
      };

      const repository = new GmoRepository(prismaMock as any);
      await expect(repository.findByUserId(userId)).rejects.toThrow("DB error");
    });
  });

  describe("create", () => {
    it("createが成功した場合、作成したオブジェクトを返す。", async () => {
      const mockResult = {
        id: 1,
        userId: 1,
        apiKey: "apiKey",
        secretKey: "secretKey",
        createdAt: new Date("2023-01-01T00:00:00.000Z"),
        updatedAt: new Date("2023-01-01T00:00:00.000Z"),
      };

      const createMock = jest.fn().mockResolvedValue(mockResult);

      const prismaMock = {
        gmo: {
          create: createMock,
        },
      };

      const repository = new GmoRepository(prismaMock as any);

      const createParams = {
        userId: 1,
        apiKey: "apiKey",
        secretKey: "secretKey",
      };

      const result = await repository.create(createParams as any);

      expect(result).toEqual(mockResult);
    });

    it("createが失敗した場合、例外をスローする", async () => {
      const createMock = jest.fn().mockRejectedValue(new Error("Insert error"));
      const prismaMock = {
        gmo: {
          create: createMock,
        },
      };

      const repository = new GmoRepository(prismaMock as any);
      await expect(
        repository.create({
          userId: 1,
          apiKey: "apiKey",
          secretKey: "secretKey",
        } as any)
      ).rejects.toThrow("Insert error");
    });
  });

  describe("update", () => {
    it("updateが成功した場合、更新したオブジェクトを返す", async () => {
      const mockResult = {
        id: 1,
        userId: 1,
        apiKey: "apiKey",
        secretKey: "secretKey",
        createdAt: new Date("2024-01-01T00:00:00Z"),
        updatedAt: new Date("2024-01-02T00:00:00Z"),
      };

      const updateMock = jest.fn().mockResolvedValue(mockResult);
      const prismaMock = {
        gmo: {
          update: updateMock,
        },
      };

      const repository = new GmoRepository(prismaMock as any);

      const updateParams = {
        id: 1,
        data: {
          apiKey: "apiKey",
          secretKey: "secretKey",
        },
      };

      const result = await repository.update(updateParams);

      expect(updateMock).toHaveBeenCalledWith({
        where: { id: updateParams.id },
        data: updateParams.data,
      });
      expect(result).toEqual(mockResult);
    });

    it("updateが失敗した場合、例外をスローする", async () => {
      const updateMock = jest.fn().mockRejectedValue(new Error("Update error"));
      const prismaMock = {
        gmo: {
          update: updateMock,
        },
      };

      const repository = new GmoRepository(prismaMock as any);
    });
  });
});
