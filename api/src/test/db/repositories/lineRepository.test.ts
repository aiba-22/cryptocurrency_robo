import { LineRepository } from "../../../db/repositories/lineRepository";

describe("LineRepository", () => {
  describe("findByUserId", () => {
    const userId = 1;

    it("findFirstが成功した場合、対象のオブジェクトを返すこと", async () => {
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

    it("findFirstが失敗した場合に例外をスローする", async () => {
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

    it("createが成功した場合、作成したオブジェクトを返すこと", async () => {
      const mockCreated = {
        id: 1,
        ...createParams,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const createMock = jest.fn().mockResolvedValue(mockCreated);
      const prismaMock = {
        line: {
          create: createMock,
        },
      };

      const repository = new LineRepository(prismaMock as any);
      const result = await repository.create(createParams);

      expect(createMock).toHaveBeenCalledWith({ data: createParams });
      expect(result).toEqual(mockCreated);
    });

    it("createが失敗した場合に例外をスローする", async () => {
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

    it("updateが成功した場合、更新したオブジェクトを返すこと", async () => {
      const mockUpdated = {
        id: 1,
        userId: 1,
        channelAccessToken: "updated-token",
        lineUserId: "updated-line-user",
        createdAt: new Date("2024-01-01T00:00:00Z"),
        updatedAt: new Date(),
      };

      const updateMock = jest.fn().mockResolvedValue(mockUpdated);
      const prismaMock = {
        line: {
          update: updateMock,
        },
      };

      const repository = new LineRepository(prismaMock as any);
      const result = await repository.update(updateParams);

      expect(updateMock).toHaveBeenCalledWith({
        where: { id: updateParams.id },
        data: updateParams.data,
      });
      expect(result).toEqual(mockUpdated);
    });

    it("updateが失敗した場合に例外をスローする", async () => {
      const updateMock = jest
        .fn()
        .mockRejectedValue(new Error("Update failed"));
      const prismaMock = {
        line: {
          update: updateMock,
        },
      };

      const repository = new LineRepository(prismaMock as any);
      await expect(repository.update(updateParams)).rejects.toThrow(
        "Update failed"
      );
    });
  });
});
