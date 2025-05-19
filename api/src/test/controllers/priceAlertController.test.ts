import * as controller from "../../controllers/priceAlertController";
import * as schema from "../../schema/priceAlertSchema";
import { ID } from "../../service/constants";
import PriceAlertService from "../../service/priceAlert";

const mockResponse = () => {
  const res = {} as any;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockRequest = (body: any) => ({ body });

describe("cryptocurrencyOrderControllerのテスト", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("list関数のテスト", () => {
    it("正常時はjsonで結果を返す", async () => {
      const req = mockRequest({});
      const res = mockResponse();

      const mockResult = {
        id: 1,
        conditions: {},
      };

      jest
        .spyOn(PriceAlertService.prototype, "find")
        .mockResolvedValue(mockResult);

      await controller.get(req as any, res);

      expect(res.json).toHaveBeenCalledWith(mockResult);
    });

    it("例外発生時は例外がthrowされる", async () => {
      const req = mockRequest({});
      const res = mockResponse();

      jest.spyOn(PriceAlertService.prototype, "find").mockImplementation(() => {
        throw new Error("DB接続失敗");
      });

      await expect(controller.get(req as any, res)).rejects.toThrow(
        "DB接続失敗"
      );
    });
  });

  describe("create関数のテスト", () => {
    const validBody = {
      conditions: {
        isUpperLimit: true,
        symbol: "BTC",
        price: 50000,
      },
    };

    it("正常時は200でsuccessを返す", async () => {
      const req = mockRequest(validBody);
      const res = mockResponse();

      jest
        .spyOn(schema.createPriceAlertSchema, "parse")
        .mockReturnValue(validBody);
      jest
        .spyOn(PriceAlertService.prototype, "create")
        .mockResolvedValue("success");

      await controller.create(req as any, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith("success");
    });

    it("例外発生時は例外がthrowされる", async () => {
      const req = mockRequest(validBody);
      const res = mockResponse();

      jest
        .spyOn(schema.createPriceAlertSchema, "parse")
        .mockImplementation(() => {
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
      conditions: {
        isUpperLimit: true,
        symbol: "BTC",
        price: 50000,
      },
    };

    it("正常時は200でsuccessを返す", async () => {
      const req = mockRequest(validBody);
      const res = mockResponse();

      jest
        .spyOn(schema.updatePriceAlertSchema, "parse")
        .mockReturnValue(validBody);
      jest
        .spyOn(PriceAlertService.prototype, "update")
        .mockResolvedValue("success");

      await controller.update(req as any, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith("success");
    });

    it("例外発生時は例外がthrowされる", async () => {
      const req = mockRequest(validBody);
      const res = mockResponse();

      jest
        .spyOn(schema.updatePriceAlertSchema, "parse")
        .mockImplementation(() => {
          throw new Error("バリデーションエラー");
        });

      await expect(controller.update(req as any, res)).rejects.toThrow(
        "バリデーションエラー"
      );
    });
  });
});
