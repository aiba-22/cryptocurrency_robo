import { CryptocurrencyOrderRepository } from "../../../db/repositories/cryptocurrencyOrderRepository";

describe("CryptocurrencyOrderRepository", () => {
  describe("list", () => {
    const userId = 1;

    it("cryptocurrencyOrder.findMany を呼び出し、結果を返す", async () => {
      const mockData = [
        {
          id: 1,
          userId,
          symbol: "BTC",
          targetPrice: 5000000,
          volume: 10,
          type: 0,
          isEnabled: 1,
          createdAt: new Date("2024-01-01T00:00:00Z"),
          updatedAt: new Date("2024-01-02T00:00:00Z"),
        },
      ];

      const findManyMock = jest.fn().mockResolvedValue(mockData);
      const prismaMock = {
        cryptocurrencyOrder: {
          findMany: findManyMock,
        },
      };

      const repository = new CryptocurrencyOrderRepository(prismaMock as any);
      const result = await repository.list(userId);

      expect(findManyMock).toHaveBeenCalledWith({ where: { userId } });
      expect(result).toEqual(mockData);
    });

    it("findMany が失敗した場合、例外をスローする", async () => {
      const findManyMock = jest.fn().mockRejectedValue(new Error("DB Error"));
      const prismaMock = {
        cryptocurrencyOrder: {
          findMany: findManyMock,
        },
      };

      const repository = new CryptocurrencyOrderRepository(prismaMock as any);
      await expect(repository.list(userId)).rejects.toThrow("DB Error");
    });
  });

  describe("findByIdAndUserId", () => {
    it("cryptocurrencyOrder.findFirst を呼び出し、結果を返す", async () => {
      const mockData = { id: 1, userId: 1 };

      const findFirstMock = jest.fn().mockResolvedValue(mockData);
      const prismaMock = {
        cryptocurrencyOrder: {
          findFirst: findFirstMock,
        },
      };

      const repository = new CryptocurrencyOrderRepository(prismaMock as any);
      const result = await repository.findByIdAndUserId({
        id: mockData.id,
        userId: mockData.userId,
      });

      expect(findFirstMock).toHaveBeenCalledWith({
        where: { id: mockData.id, userId: mockData.userId },
      });
      expect(result).toEqual(mockData);
    });

    it("findFirst が失敗した場合に例外をスローする", async () => {
      const findFirstMock = jest.fn().mockRejectedValue(new Error("DB Error"));
      const prismaMock = {
        cryptocurrencyOrder: {
          findFirst: findFirstMock,
        },
      };

      const repository = new CryptocurrencyOrderRepository(prismaMock as any);

      await expect(
        repository.findByIdAndUserId({ id: 1, userId: 1 })
      ).rejects.toThrow("DB Error");
    });
  });

  describe("create", () => {
    it("cryptocurrencyOrder.create を正しい引数で呼び出す", async () => {
      const createMock = jest.fn().mockResolvedValue(undefined);
      const prismaMock = {
        cryptocurrencyOrder: {
          create: createMock,
        },
      };

      const repository = new CryptocurrencyOrderRepository(prismaMock as any);

      const createParams = {
        userId: 1,
        symbol: "BTC",
        targetPrice: 5000000,
        volume: 10,
        type: 0,
        isEnabled: 1,
      };

      await repository.create(createParams as any);

      expect(createMock).toHaveBeenCalledWith({
        data: createParams,
      });
    });

    it("create が失敗した場合に例外をスローする", async () => {
      const createMock = jest
        .fn()
        .mockRejectedValue(new Error("Insert failed"));
      const prismaMock = {
        cryptocurrencyOrder: {
          create: createMock,
        },
      };

      const repository = new CryptocurrencyOrderRepository(prismaMock as any);

      const createParams = {
        userId: 1,
        symbol: "BTC",
        targetPrice: 5000000,
        volume: 10,
        type: 0,
        isEnabled: 1,
      };

      await expect(repository.create(createParams as any)).rejects.toThrow(
        "Insert failed"
      );
    });
  });

  describe("update", () => {
    it("cryptocurrencyOrder.updateMany を正しい引数で呼び出す", async () => {
      const updateManyMock = jest.fn().mockResolvedValue({ count: 1 });
      const prismaMock = {
        cryptocurrencyOrder: {
          updateMany: updateManyMock,
        },
      };

      const repository = new CryptocurrencyOrderRepository(prismaMock as any);

      const updateParams = {
        id: 1,
        data: {
          symbol: "BTC",
          targetPrice: 5000000,
          volume: 10,
          type: 0,
          isEnabled: 1,
        },
      };

      await repository.update(updateParams as any);

      expect(updateManyMock).toHaveBeenCalledWith({
        where: { id: updateParams.id },
        data: updateParams.data,
      });
    });

    it("updateMany が失敗した場合、例外をスローする", async () => {
      const updateManyMock = jest
        .fn()
        .mockRejectedValue(new Error("Update failed"));
      const prismaMock = {
        cryptocurrencyOrder: {
          updateMany: updateManyMock,
        },
      };

      const repository = new CryptocurrencyOrderRepository(prismaMock as any);

      const updateParams = {
        id: 1,
        data: {
          symbol: "BTC",
          targetPrice: 5000000,
          volume: 10,
          type: 0,
          isEnabled: 1,
        },
      };

      await expect(repository.update(updateParams as any)).rejects.toThrow(
        "Update failed"
      );
    });
  });
});
