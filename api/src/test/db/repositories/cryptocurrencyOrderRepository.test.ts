import { CryptocurrencyOrderRepository } from "../../../db/repositories/cryptocurrencyOrderRepository";

describe("CryptocurrencyOrderRepository", () => {
  describe("listメソッド", () => {
    const userId = 1;

    it("DBに'cryptocurrency_order'テーブルのクエリを実行し、結果を返す", async () => {
      const mockData = [
        {
          id: 1,
          symbol: "BTC",
          target_price: 5000000,
          volume: 10,
          type: 0,
          is_enabled: 1,
          created_at: new Date("2024-01-01T00:00:00Z"),
          updated_at: new Date("2024-01-02T00:00:00Z"),
        },
      ];

      const whereMock = jest.fn().mockResolvedValue(mockData);
      const dbMock = jest.fn(() => ({ where: whereMock }));

      const repository = new CryptocurrencyOrderRepository(dbMock as any);
      const result = await repository.list(userId);

      expect(dbMock).toHaveBeenCalledWith("cryptocurrency_order");
      expect(whereMock).toHaveBeenCalledWith({ user_id: userId });
      expect(result).toEqual(mockData);
    });

    it("DBのクエリが失敗した場合、例外をスローする", async () => {
      const whereMock = jest.fn().mockRejectedValue(new Error());
      const dbMock = jest.fn(() => ({ where: whereMock }));

      const repository = new CryptocurrencyOrderRepository(dbMock as any);

      await expect(repository.list(userId)).rejects.toThrow();
    });
  });

  describe("createメソッド", () => {
    it("DBのinsertを正しい引数で呼び出す", async () => {
      const insertMock = jest.fn().mockResolvedValue(undefined);
      const dbMock = jest.fn(() => ({ insert: insertMock }));

      const repository = new CryptocurrencyOrderRepository(dbMock as any);

      const createParams = {
        symbol: "BTC",
        targetPrice: 5000000,
        volume: 10,
        type: 0,
        isEnabled: 1,
      };

      await repository.create(createParams);

      expect(dbMock).toHaveBeenCalledWith("cryptocurrency_order");
      expect(insertMock).toHaveBeenCalledWith({
        symbol: "BTC",
        target_price: 5000000,
        volume: 10,
        type: 0,
        is_enabled: 1,
      });
    });

    it("DBのinsertが失敗した場合、例外をスローする", async () => {
      const insertMock = jest.fn().mockRejectedValue(new Error());
      const dbMock = jest.fn(() => ({ insert: insertMock }));

      const repository = new CryptocurrencyOrderRepository(dbMock as any);

      const createParams = {
        symbol: "BTC",
        targetPrice: 5000000,
        volume: 10,
        type: 0,
        isEnabled: 1,
      };

      await expect(repository.create(createParams)).rejects.toThrow();
    });
  });

  describe("updateメソッド", () => {
    it("DBのupdateを正しい引数で呼び出す", async () => {
      const updateMock = jest.fn().mockResolvedValue(undefined);
      const whereMock = jest.fn(() => ({ update: updateMock }));
      const dbMock = jest.fn(() => ({ where: whereMock }));

      const repository = new CryptocurrencyOrderRepository(dbMock as any);

      const updateParams = {
        id: 1,
        symbol: "BTC",
        targetPrice: 5000000,
        volume: 10,
        type: 0,
        isEnabled: 1,
      };

      await repository.update(updateParams);

      expect(dbMock).toHaveBeenCalledWith("cryptocurrency_order");
      expect(whereMock).toHaveBeenCalledWith({ id: updateParams.id });
      expect(updateMock).toHaveBeenCalledWith({
        symbol: updateParams.symbol,
        target_price: updateParams.targetPrice,
        volume: updateParams.volume,
        type: updateParams.type,
        is_enabled: updateParams.isEnabled,
        updated_at: expect.any(Date),
      });
    });

    it("DBのupdateが失敗した場合、例外をスローする", async () => {
      const updateMock = jest.fn().mockRejectedValue(new Error());
      const whereMock = jest.fn(() => ({ update: updateMock }));
      const dbMock = jest.fn(() => ({ where: whereMock }));

      const repository = new CryptocurrencyOrderRepository(dbMock as any);

      const updateParams = {
        id: 1,
        symbol: "BTC",
        targetPrice: 5000000,
        volume: 10,
        type: 0,
        isEnabled: 1,
      };

      await expect(repository.update(updateParams)).rejects.toThrow();
    });
  });
});
