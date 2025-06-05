import { PriceAlertRepository } from "../../../db/repositories/priceAlertRepository";

describe("PriceAlertRepository", () => {
  describe("findByUserId", () => {
    const userId = 1;

    it("findFirstが成功した場合、対象のオブジェクトを返す", async () => {
      const mockData = {
        id: 1,
        userId: 1,
        conditions: {
          price: 10000,
          isUpperLimit: true,
          symbol: "BTC",
        },
        createdAt: new Date("2024-01-01T00:00:00Z"),
      };

      const findFirstMock = jest.fn().mockResolvedValue(mockData);
      const prismaMock = {
        priceAlert: {
          findFirst: findFirstMock,
        },
      };

      const repository = new PriceAlertRepository(prismaMock as any);
      const result = await repository.findByUserId(userId);

      expect(findFirstMock).toHaveBeenCalledWith({ where: { userId } });
      expect(result).toEqual(mockData);
    });

    it("findFirstが失敗した場合、例外をスローする", async () => {
      const findFirstMock = jest.fn().mockRejectedValue(new Error("DB error"));
      const prismaMock = {
        priceAlert: {
          findFirst: findFirstMock,
        },
      };

      const repository = new PriceAlertRepository(prismaMock as any);
      await expect(repository.findByUserId(userId)).rejects.toThrow("DB error");
    });
  });

  describe("create", () => {
    const createParams = {
      userId: 1,
      conditions: {
        price: 10000,
        isUpperLimit: true,
        symbol: "BTC",
      },
    };

    it("createが成功した場合、作成したオブジェクトを返す", async () => {
      const createdObject = {
        id: 1,
        ...createParams,
        createdAt: new Date(),
      };
      const createMock = jest.fn().mockResolvedValue(createdObject);
      const prismaMock = {
        priceAlert: {
          create: createMock,
        },
      };

      const repository = new PriceAlertRepository(prismaMock as any);
      const result = await repository.create(createParams as any);
      expect(createMock).toHaveBeenCalledWith({ data: createParams });
      expect(result).toEqual(createdObject);
    });

    it("createが失敗した場合、例外をスローする", async () => {
      const createMock = jest.fn().mockRejectedValue(new Error("Insert error"));
      const prismaMock = {
        priceAlert: {
          create: createMock,
        },
      };

      const repository = new PriceAlertRepository(prismaMock as any);
      await expect(repository.create(createParams as any)).rejects.toThrow(
        "Insert error"
      );
    });
  });

  describe("update", () => {
    const updateParams = {
      id: 1,
      data: {
        conditions: {
          price: 1000,
          isUpperLimit: true,
          symbol: "BTC",
        },
      },
    };

    it("updateが成功した場合、更新したオブジェクトを返す", async () => {
      const updatedObject = {
        id: updateParams.id,
        ...updateParams.data,
      };
      const updateMock = jest.fn().mockResolvedValue(updatedObject);
      const prismaMock = {
        priceAlert: {
          update: updateMock,
        },
      };

      const repository = new PriceAlertRepository(prismaMock as any);
      const result = await repository.update(updateParams);
      expect(updateMock).toHaveBeenCalledWith({
        where: { id: updateParams.id },
        data: updateParams.data,
      });
      expect(result).toEqual(updatedObject);
    });

    it("update が失敗した場合、例外をスローする", async () => {
      const updateMock = jest.fn().mockRejectedValue(new Error("Update error"));
      const prismaMock = {
        priceAlert: {
          update: updateMock,
        },
      };

      const repository = new PriceAlertRepository(prismaMock as any);
      await expect(repository.update(updateParams)).rejects.toThrow(
        "Update error"
      );
    });
  });
});
