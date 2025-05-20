import { PriceAlertRepository } from "../../../db/repositories/priceAlertRepository";

describe("priceAlertRepository", () => {
  describe("findByIdメソッド", () => {
    const userId = 1;

    it("DBに'priceAlert'テーブルのクエリを実行し、結果を返す", async () => {
      const mockData = {
        id: 1,
        conditions: {
          price: 10000,
          isUpperLimit: true,
          symbol: "BTC",
        },
        created_at: new Date("2024-01-01T00:00:00Z"),
      };
      const whereMock = jest.fn().mockReturnValue({
        first: jest.fn().mockResolvedValue(mockData),
      });
      const dbMock = jest.fn(() => ({
        where: whereMock,
      }));
      const repository = new PriceAlertRepository(dbMock as any);
      const result = await repository.findById(userId);
      expect(dbMock).toHaveBeenCalledWith("price_alert");
      expect(result).toEqual(mockData);
    });

    it("DBのクエリが失敗した場合、例外をスローする", async () => {
      const whereMock = jest.fn().mockReturnValue({
        first: jest.fn().mockRejectedValue(new Error()),
      });
      const dbMock = jest.fn(() => ({
        where: whereMock,
      }));
      const repository = new PriceAlertRepository(dbMock as any);
      await expect(repository.findById(userId)).rejects.toThrow();
    });
  });
  describe("createメソッド", () => {
    const createParams = {
      price: 10000,
      isUpperLimit: true,
      symbol: "BTC",
    };

    it("DBのinsertを正しい引数で呼び出す", async () => {
      const insertMock = jest.fn().mockResolvedValue(undefined);
      const dbMock = jest.fn(() => ({
        insert: insertMock,
      }));
      const repository = new PriceAlertRepository(dbMock as any);

      await repository.create(createParams);
      expect(dbMock).toHaveBeenCalledWith("price_alert");
      expect(insertMock).toHaveBeenCalledWith({
        conditions: {
          isUpperLimit: true,
          price: 10000,
          symbol: "BTC",
        },
      });
    });

    it("DBのinsertが失敗した場合、例外をスローする", async () => {
      const insertMock = jest.fn().mockRejectedValue(new Error());
      const dbMock = jest.fn(() => ({
        insert: insertMock,
      }));
      const repository = new PriceAlertRepository(dbMock as any);
      await expect(repository.create(createParams)).rejects.toThrow();
    });
  });
  describe("updateメソッド", () => {
    const updateParams = {
      id: 1,
      conditions: {
        price: 1000,
        isUpperLimit: true,
        symbol: "BTC",
      },
    };

    it("DBのupdateを正しい引数で呼び出す", async () => {
      const updateMock = jest.fn().mockResolvedValue(undefined);
      const whereMock = jest.fn(() => ({
        update: updateMock,
      }));
      const dbMock = jest.fn(() => ({
        where: whereMock,
      }));

      const repository = new PriceAlertRepository(dbMock as any);

      await repository.update(updateParams);
      expect(dbMock).toHaveBeenCalledWith("price_alert");
      expect(updateMock).toHaveBeenCalledWith({
        conditions: JSON.stringify(updateParams.conditions),
        updated_at: expect.any(Date),
      });
    });

    it("DBのupdateが失敗した場合、例外をスローする", async () => {
      const updateMock = jest.fn().mockRejectedValue(new Error());
      const whereMock = jest.fn(() => ({ update: updateMock }));
      const dbMock = jest.fn(() => ({ where: whereMock }));

      const repository = new PriceAlertRepository(dbMock as any);
      await expect(repository.update(updateParams)).rejects.toThrow();
    });
  });
});
