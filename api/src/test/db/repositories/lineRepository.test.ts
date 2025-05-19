import { LineRepository } from "../../../db/repositories/lineRepository";

describe("LineRepository", () => {
  describe("findByIdメソッド", () => {
    it("DBに'line'テーブルのクエリを実行し、結果を返す", async () => {
      const mockData = {
        id: 1,
        api_key: "test_api_key",
        secret_key: "test_secret_key",
        created_at: new Date("2024-01-01T00:00:00Z"),
      };
      const whereMock = jest.fn().mockReturnValue({
        first: jest.fn().mockResolvedValue(mockData),
      });
      const dbMock = jest.fn(() => ({
        where: whereMock,
      }));
      const repository = new LineRepository(dbMock as any);
      const result = await repository.findById(1);
      expect(dbMock).toHaveBeenCalledWith("line");
      expect(result).toEqual(mockData);
    });

    it("DBのクエリが失敗した場合、例外をスローする", async () => {
      const whereMock = jest.fn().mockReturnValue({
        first: jest.fn().mockRejectedValue(new Error("DB Error")),
      });
      const dbMock = jest.fn(() => ({
        where: whereMock,
      }));
      const repository = new LineRepository(dbMock as any);
      await expect(repository.findById(1)).rejects.toThrow("DB Error");
    });
  });
  describe("createメソッド", () => {
    const createParams = {
      channelAccessToken: "test_channel_access_token",
      userId: "test_user_id",
    };

    it("DBのinsertを正しい引数で呼び出す", async () => {
      const insertMock = jest.fn().mockResolvedValue(undefined);
      const dbMock = jest.fn(() => ({
        insert: insertMock,
      }));
      const repository = new LineRepository(dbMock as any);

      await repository.create(createParams);
      expect(dbMock).toHaveBeenCalledWith("line");
      expect(insertMock).toHaveBeenCalledWith({
        channel_access_token: "test_channel_access_token",
        user_id: "test_user_id",
        created_at: expect.any(Date),
      });
    });

    it("DBのinsertが失敗した場合、例外をスローする", async () => {
      const insertMock = jest.fn().mockRejectedValue(new Error("DB Error"));
      const dbMock = jest.fn(() => ({
        insert: insertMock,
      }));
      const repository = new LineRepository(dbMock as any);
      await expect(repository.create(createParams)).rejects.toThrow("DB Error");
    });
  });
  describe("updateメソッド", () => {
    const updateParams = {
      id: 1,
      channelAccessToken: "test_channel_access_token",
      userId: "test_user_id",
    };

    it("DBのupdateを正しい引数で呼び出す", async () => {
      const updateMock = jest.fn().mockResolvedValue(undefined);
      const whereMock = jest.fn(() => ({
        update: updateMock,
      }));
      const dbMock = jest.fn(() => ({
        where: whereMock,
      }));
      const repository = new LineRepository(dbMock as any);

      await repository.update(updateParams);
      expect(dbMock).toHaveBeenCalledWith("line");
      expect(whereMock).toHaveBeenCalledWith({ id: 1 });
      expect(updateMock).toHaveBeenCalledWith({
        channel_access_token: "test_channel_access_token",
        user_id: "test_user_id",
        updated_at: expect.any(Date),
      });
    });

    it("DBのupdateが失敗した場合、例外をスローする", async () => {
      const updateMock = jest.fn().mockRejectedValue(new Error("DB Error"));
      const whereMock = jest.fn(() => ({
        update: updateMock,
      }));
      const dbMock = jest.fn(() => ({
        where: whereMock,
      }));
      const repository = new LineRepository(dbMock as any);
      await expect(repository.update(updateParams)).rejects.toThrow("DB Error");
    });
  });
});
