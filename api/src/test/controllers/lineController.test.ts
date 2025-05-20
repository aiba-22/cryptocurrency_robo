import * as controller from "../../controllers/lineController";
import * as schema from "../../schema/lineSchema";
import LineService from "../../service//lineService";

const mockResponse = () => {
  const res = {} as any;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockRequest = (body: any) => ({ body });

describe("LineControllerのテスト", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("list関数のテスト", () => {
    it("正常時はjsonで結果を返す", async () => {
      const req = mockRequest({});
      const res = mockResponse();

      const mockResult = {
        id: 1,
        channelAccessToken: "line_api_key",
        userId: "line_user_id",
      };
      jest.spyOn(LineService.prototype, "find").mockResolvedValue(mockResult);

      await controller.get(req as any, res);

      expect(res.json).toHaveBeenCalledWith(mockResult);
    });

    it("例外発生時は例外がthrowされる", async () => {
      const req = mockRequest({});
      const res = mockResponse();

      jest.spyOn(LineService.prototype, "find").mockImplementation(() => {
        throw new Error();
      });

      await expect(controller.get(req as any, res)).rejects.toThrow();
    });
  });

  describe("create関数のテスト", () => {
    const validBody = {
      channelAccessToken: "line_api_key",
      userId: "line_user_id",
    };

    it("正常時は200でsuccessを返す", async () => {
      const req = mockRequest(validBody);
      const res = mockResponse();

      jest.spyOn(schema.createLineSchema, "parse").mockReturnValue(validBody);
      jest.spyOn(LineService.prototype, "create").mockResolvedValue("success");

      await controller.create(req as any, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith("success");
    });

    it("例外発生時は例外がthrowされる", async () => {
      const req = mockRequest(validBody);
      const res = mockResponse();

      jest.spyOn(schema.createLineSchema, "parse").mockImplementation(() => {
        throw new Error();
      });

      await expect(controller.create(req as any, res)).rejects.toThrow();
    });
  });

  describe("update関数のテスト", () => {
    const validBody = {
      id: 1,
      channelAccessToken: "line_api_key",
      userId: "line_user_id",
    };

    it("正常時は200でsuccessを返す", async () => {
      const req = mockRequest(validBody);
      const res = mockResponse();

      jest.spyOn(schema.updateLineSchema, "parse").mockReturnValue(validBody);
      jest.spyOn(LineService.prototype, "update").mockResolvedValue("success");

      await controller.update(req as any, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith("success");
    });

    it("例外発生時は例外がthrowされる", async () => {
      const req = mockRequest(validBody);
      const res = mockResponse();

      jest.spyOn(schema.updateLineSchema, "parse").mockImplementation(() => {
        throw new Error();
      });

      await expect(controller.update(req as any, res)).rejects.toThrow();
    });
  });
});
