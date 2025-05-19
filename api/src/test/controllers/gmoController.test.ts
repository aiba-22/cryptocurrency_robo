import * as controller from "../../controllers/gmoController";
import * as schema from "../../schema/gmoSchema";
import GmoService from "../../service/gmo";

const mockResponse = () => {
  const res = {} as any;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockRequest = (body: any) => ({ body });

describe("gmoControllerのテスト", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("list関数のテスト", () => {
    it("正常時はjsonで結果を返す", async () => {
      const req = mockRequest({});
      const res = mockResponse();

      const mockResult = {
        id: 1,
        apiKey: "gmo_api_key",
        secretKey: "gmo_secret_key",
      };
      jest.spyOn(GmoService.prototype, "find").mockResolvedValue(mockResult);

      await controller.get(req as any, res);

      expect(res.json).toHaveBeenCalledWith(mockResult);
    });

    it("例外発生時は例外がthrowされる", async () => {
      const req = mockRequest({});
      const res = mockResponse();

      jest.spyOn(GmoService.prototype, "find").mockImplementation(() => {
        throw new Error("DB接続失敗");
      });

      await expect(controller.get(req as any, res)).rejects.toThrow(
        "DB接続失敗"
      );
    });
  });

  describe("create関数のテスト", () => {
    const validBody = {
      id: 1,
      apiKey: "gmo_api_key",
      secretKey: "gmo_secret_key",
    };

    it("正常時は200でsuccessを返す", async () => {
      const req = mockRequest(validBody);
      const res = mockResponse();

      jest.spyOn(schema.createGmoSchema, "parse").mockReturnValue(validBody);
      jest.spyOn(GmoService.prototype, "create").mockResolvedValue("success");

      await controller.create(req as any, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith("success");
    });

    it("例外発生時は例外がthrowされる", async () => {
      const req = mockRequest(validBody);
      const res = mockResponse();

      jest.spyOn(schema.createGmoSchema, "parse").mockImplementation(() => {
        throw new Error("バリデーションエラー");
      });

      await expect(controller.create(req as any, res)).rejects.toThrow(
        "バリデーションエラー"
      );
    });
  });

  describe("update関数のテスト", () => {
    const validBody = {
      id: 1,
      apiKey: "gmo_api_key",
      secretKey: "gmo_secret_key",
    };

    it("正常時は200でsuccessを返す", async () => {
      const req = mockRequest(validBody);
      const res = mockResponse();

      jest.spyOn(schema.updateGmoSchema, "parse").mockReturnValue(validBody);
      jest.spyOn(GmoService.prototype, "update").mockResolvedValue("success");

      await controller.update(req as any, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith("success");
    });

    it("例外発生時は例外がthrowされる", async () => {
      const req = mockRequest(validBody);
      const res = mockResponse();

      jest.spyOn(schema.updateGmoSchema, "parse").mockImplementation(() => {
        throw new Error("バリデーションエラー");
      });

      await expect(controller.update(req as any, res)).rejects.toThrow(
        "バリデーションエラー"
      );
    });
  });
});
