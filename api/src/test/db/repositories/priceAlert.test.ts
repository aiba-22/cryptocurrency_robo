import { PriceAlertRepository } from "../../../db/repositories/priceAlertRepository";

describe("PriceAlertRepository", () => {
  describe("findByUserId", () => {
    const userId = 1;

    it("priceAlert.findFirst を呼び出し、結果を返す", async () => {
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

    it("findFirst が失敗した場合、例外をスローする", async () => {
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

    it("priceAlert.create を正しい引数で呼び出す", async () => {
      const createMock = jest.fn().mockResolvedValue(undefined);
      const prismaMock = {
        priceAlert: {
          create: createMock,
        },
      };

      const repository = new PriceAlertRepository(prismaMock as any);
      await repository.create(createParams as any);

      expect(createMock).toHaveBeenCalledWith({
        data: createParams,
      });
    });

    it("create が失敗した場合、例外をスローする", async () => {
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

    it("priceAlert.updateMany を正しい引数で呼び出す", async () => {
      const updateManyMock = jest.fn().mockResolvedValue({ count: 1 });
      const prismaMock = {
        priceAlert: {
          updateMany: updateManyMock,
        },
      };

      const repository = new PriceAlertRepository(prismaMock as any);
      await repository.update(updateParams);

      expect(updateManyMock).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateParams.data,
      });
    });

    it("updateMany が失敗した場合、例外をスローする", async () => {
      const updateManyMock = jest
        .fn()
        .mockRejectedValue(new Error("Update error"));
      const prismaMock = {
        priceAlert: {
          updateMany: updateManyMock,
        },
      };

      const repository = new PriceAlertRepository(prismaMock as any);
      await expect(repository.update(updateParams)).rejects.toThrow(
        "Update error"
      );
    });
  });
});
