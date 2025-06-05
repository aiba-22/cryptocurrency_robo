import { LineRepository } from "../../../db/repositories/lineRepository";

describe("LineRepository", () => {
  describe("findByUserId", () => {
    const userId = 1;

    it("line.findFirst を呼び出し、結果を返す", async () => {
      const mockData = {
        id: 1,
        userId,
        channelAccessToken: "token",
        lineUserId: "line-user",
        createdAt: new Date("2024-01-01T00:00:00Z"),
      };

      const findFirstMock = jest.fn().mockResolvedValue(mockData);
      const prismaMock = {
        line: {
          findFirst: findFirstMock,
        },
      };

      const repository = new LineRepository(prismaMock as any);
      const result = await repository.findByUserId(userId);

      expect(findFirstMock).toHaveBeenCalledWith({ where: { userId } });
      expect(result).toEqual(mockData);
    });

    it("findFirst が失敗した場合に例外をスローする", async () => {
      const findFirstMock = jest.fn().mockRejectedValue(new Error("DB Error"));
      const prismaMock = {
        line: {
          findFirst: findFirstMock,
        },
      };

      const repository = new LineRepository(prismaMock as any);
      await expect(repository.findByUserId(userId)).rejects.toThrow("DB Error");
    });
  });

  describe("create", () => {
    const createParams = {
      userId: 1,
      channelAccessToken: "token",
      lineUserId: "line-user",
    };

    it("line.create を正しい引数で呼び出す", async () => {
      const createMock = jest.fn().mockResolvedValue(undefined);
      const prismaMock = {
        line: {
          create: createMock,
        },
      };

      const repository = new LineRepository(prismaMock as any);
      await repository.create(createParams);

      expect(createMock).toHaveBeenCalledWith({
        data: createParams,
      });
    });

    it("create が失敗した場合に例外をスローする", async () => {
      const createMock = jest
        .fn()
        .mockRejectedValue(new Error("Insert failed"));
      const prismaMock = {
        line: {
          create: createMock,
        },
      };

      const repository = new LineRepository(prismaMock as any);
      await expect(repository.create(createParams)).rejects.toThrow(
        "Insert failed"
      );
    });
  });

  describe("update", () => {
    const updateParams = {
      id: 1,
      data: {
        channelAccessToken: "updated-token",
        lineUserId: "updated-line-user",
      },
    };

    it("line.updateMany を正しい引数で呼び出す", async () => {
      const updateManyMock = jest.fn().mockResolvedValue({ count: 1 });
      const prismaMock = {
        line: {
          updateMany: updateManyMock,
        },
      };

      const repository = new LineRepository(prismaMock as any);
      await repository.update(updateParams);

      expect(updateManyMock).toHaveBeenCalledWith({
        where: { id: updateParams.id },
        data: updateParams.data,
      });
    });

    it("updateMany が失敗した場合に例外をスローする", async () => {
      const updateManyMock = jest
        .fn()
        .mockRejectedValue(new Error("Update failed"));
      const prismaMock = {
        line: {
          updateMany: updateManyMock,
        },
      };

      const repository = new LineRepository(prismaMock as any);
      await expect(repository.update(updateParams)).rejects.toThrow(
        "Update failed"
      );
    });
  });
});
