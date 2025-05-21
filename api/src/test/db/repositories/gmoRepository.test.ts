import { GmoRepository } from "../../../db/repositories/gmoRepository";

describe("GmoRepository", () => {
  describe("findByUserIdメソッド", () => {
    const userId = 1;

    it("DBに'gmo'テーブルのクエリを実行し、結果を返す", async () => {
      const mockData = {
        id: 1,
        apiKey: "apiKey",
        secretKey: "secretKey",
        created_at: new Date("2024-01-01T00:00:00Z"),
      };
      const whereMock = jest.fn().mockReturnValue({
        first: jest.fn().mockResolvedValue(mockData),
      });
      const dbMock = jest.fn(() => ({
        where: whereMock,
      }));
      const repository = new GmoRepository(dbMock as any);
      const result = await repository.findByUserId(userId);
      expect(dbMock).toHaveBeenCalledWith("gmo");
      expect(result).toEqual(mockData);
    });

    it("DBのクエリが失敗した場合、例外をスローする", async () => {
      const whereMock = jest.fn().mockReturnValue({
        first: jest.fn().mockRejectedValue(new Error()),
      });
      const dbMock = jest.fn(() => ({
        where: whereMock,
      }));
      const repository = new GmoRepository(dbMock as any);
      await expect(repository.findByUserId(userId)).rejects.toThrow();
    });
  });
  describe("createメソッド", () => {
    it("DBのinsertを正しい引数で呼び出す", async () => {
      const insertMock = jest.fn().mockResolvedValue(undefined);
      const dbMock = jest.fn(() => ({
        insert: insertMock,
      }));
      const repository = new GmoRepository(dbMock as any);
      const createParams = {
        userId: 1,
        apiKey: "apiKey",
        secretKey: "secretKey",
      };
      await repository.create(createParams);
      expect(dbMock).toHaveBeenCalledWith("gmo");
      expect(insertMock).toHaveBeenCalledWith({
        user_id: 1,
        api_key: "apiKey",
        secret_key: "secretKey",
        created_at: expect.any(Date),
      });
    });

    it("DBのinsertが失敗した場合、例外をスローする", async () => {
      const insertMock = jest.fn().mockRejectedValue(new Error());
      const dbMock = jest.fn(() => ({
        insert: insertMock,
      }));
      const repository = new GmoRepository(dbMock as any);
      await expect(
        repository.create({
          userId: 1,
          apiKey: "apiKey",
          secretKey: "secretKey",
        })
      ).rejects.toThrow();
    });
  });
  describe("updateメソッド", () => {
    it("DBのupdateを正しい引数で呼び出す", async () => {
      const updateMock = jest.fn().mockResolvedValue(undefined);
      const whereMock = jest.fn(() => ({
        update: updateMock,
      }));
      const dbMock = jest.fn(() => ({
        where: whereMock,
      }));
      const repository = new GmoRepository(dbMock as any);
      const updateParams = {
        id: 1,
        apiKey: "apiKey",
        secretKey: "secretKey",
      };
      await repository.update(updateParams);
      expect(dbMock).toHaveBeenCalledWith("gmo");
      expect(whereMock).toHaveBeenCalledWith({ id: 1 });
      expect(updateMock).toHaveBeenCalledWith({
        api_key: "apiKey",
        secret_key: "secretKey",
        updated_at: expect.any(Date),
      });
    });

    it("DBのupdateが失敗した場合、例外をスローする", async () => {
      const updateMock = jest.fn().mockRejectedValue(new Error());
      const whereMock = jest.fn(() => ({
        update: updateMock,
      }));
      const dbMock = jest.fn(() => ({
        where: whereMock,
      }));
      const repository = new GmoRepository(dbMock as any);
      await expect(
        repository.update({ id: 1, apiKey: "key", secretKey: "secret" })
      ).rejects.toThrow();
    });
  });
});
