import { CryptocurrencyOrderRepository } from "../../../db/repositories/cryptocurrencyOrderRepository";

describe("CryptocurrencyOrderRepository", () => {
  describe("list", () => {
    const userId = 1;

    it("findManyが成功した場合、対象の配列を返す", async () => {
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

    it("findManyが失敗した場合、例外をスローする", async () => {
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
    it("findFirstが成功した場合、対象のオブジェクトを返す", async () => {
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

    it("findFirstが失敗した場合に例外をスローする", async () => {
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

  it("createが作成した場合、作成したオブジェクトを返す", async () => {
    const createParams = {
      userId: 1,
      symbol: "BTC",
      targetPrice: 5000000,
      volume: 10,
      type: 0,
      isEnabled: 1,
    };

    const mockResult = {
      id: 1,
      ...createParams,
      createdAt: new Date("2023-01-01T00:00:00.000Z"),
      updatedAt: new Date("2023-01-01T00:00:00.000Z"),
    };

    const createMock = jest.fn().mockResolvedValue(mockResult);
    const prismaMock = {
      cryptocurrencyOrder: {
        create: createMock,
      },
    };

    const repository = new CryptocurrencyOrderRepository(prismaMock as any);

    const result = await repository.create(createParams as any);

    expect(result).toEqual(mockResult);
  });

  it("createが失敗した場合に例外をスローする", async () => {
    const createMock = jest.fn().mockRejectedValue(new Error("Insert failed"));
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
  it("updateが成功した場合、更新後のオブジェクトを返す", async () => {
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

    const mockResult = {
      id: 1,
      userId: 123,
      symbol: "BTC",
      targetPrice: 5000000,
      volume: 10,
      type: 0,
      isEnabled: 1,
      createdAt: new Date("2023-01-01T00:00:00.000Z"),
      updatedAt: new Date("2023-01-02T00:00:00.000Z"),
    };

    const updateMock = jest.fn().mockResolvedValue(mockResult);
    const prismaMock = {
      cryptocurrencyOrder: {
        update: updateMock,
      },
    };
    const repository = new CryptocurrencyOrderRepository(prismaMock as any);

    const result = await repository.update(updateParams as any);
    expect(result).toEqual(mockResult);
  });

  it("updateが失敗した場合、例外をスローする", async () => {
    const updateMock = jest.fn().mockRejectedValue(new Error("Update failed"));
    const prismaMock = {
      cryptocurrencyOrder: {
        update: updateMock,
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
