import { GmoRepository } from "../../../db/repositories/gmoRepository";

describe("GmoRepository", () => {
  describe("findByUserId", () => {
    const userId = 1;

    it("gmo.findFirst を呼び出して結果を返す", async () => {
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

    it("gmo.findFirst が失敗した場合、例外をスローする", async () => {
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
    it("gmo.create を正しい引数で呼び出す", async () => {
      const createMock = jest.fn().mockResolvedValue(undefined);
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

      await repository.create(createParams as any);

      expect(createMock).toHaveBeenCalledWith({
        data: createParams,
      });
    });

    it("gmo.create が失敗した場合、例外をスローする", async () => {
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
    it("gmo.updateMany を正しい引数で呼び出す", async () => {
      const updateManyMock = jest.fn().mockResolvedValue({ count: 1 });
      const prismaMock = {
        gmo: {
          updateMany: updateManyMock,
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

      await repository.update(updateParams);

      expect(updateManyMock).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateParams.data,
      });
    });

    it("gmo.updateMany が失敗した場合、例外をスローする", async () => {
      const updateManyMock = jest
        .fn()
        .mockRejectedValue(new Error("Update error"));
      const prismaMock = {
        gmo: {
          updateMany: updateManyMock,
        },
      };

      const repository = new GmoRepository(prismaMock as any);
      await expect(
        repository.update({
          id: 1,
          data: {
            apiKey: "key",
            secretKey: "secret",
          },
        })
      ).rejects.toThrow("Update error");
    });
  });
});
