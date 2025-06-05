import * as controller from "../../controllers/cryptocurrencyOrderController";
import * as schema from "../../schema/cryptocurrencyOrderSchema";
import CryptocurrencyOrderService from "../../service/cryptocurrencyOrderService";

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

  describe("list", () => {
    it("正常時はjsonで結果を返す", async () => {
      const req = mockRequest({});
      const res = mockResponse();

      const mockResult = [
        {
          id: 1,
          symbol: "BTC",
          targetPrice: 50000,
          volume: 1,
          type: 0,
          isEnabled: 1,
        },
      ];

      jest
        .spyOn(CryptocurrencyOrderService.prototype, "list")
        .mockResolvedValue(mockResult);

      await controller.list(req as any, res);

      expect(res.json).toHaveBeenCalledWith(mockResult);
    });

    it("例外発生時は例外がthrowされる", async () => {
      const req = mockRequest({});
      const res = mockResponse();

      jest
        .spyOn(CryptocurrencyOrderService.prototype, "list")
        .mockImplementation(() => {
          throw new Error();
        });

      await expect(controller.list(req as any, res)).rejects.toThrow();
    });
  });

  describe("create", () => {
    const validBody = {
      symbol: "BTC",
      targetPrice: 50000,
      volume: 1,
      type: 0,
      isEnabled: 1,
    } as const;

    it("正常時は200でsuccessを返す", async () => {
      const req = mockRequest(validBody);
      const res = mockResponse();

      jest
        .spyOn(schema.createCryptocurrencyOrderSchema, "parse")
        .mockReturnValue(validBody);
      jest
        .spyOn(CryptocurrencyOrderService.prototype, "create")
        .mockResolvedValue("success");

      await controller.create(req as any, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith("success");
    });

    it("例外発生時は例外がthrowされる", async () => {
      const req = mockRequest(validBody);
      const res = mockResponse();

      jest
        .spyOn(schema.createCryptocurrencyOrderSchema, "parse")
        .mockImplementation(() => {
          throw new Error();
        });

      await expect(controller.create(req as any, res)).rejects.toThrow();
    });
  });

  describe("update", () => {
    const validBody = {
      id: 1,
      symbol: "BTC",
      targetPrice: 50000,
      volume: 1,
      type: 0,
      isEnabled: 1,
    } as const;

    it("正常時は200でsuccessを返す", async () => {
      const req = mockRequest(validBody);
      const res = mockResponse();

      jest
        .spyOn(schema.updateCryptocurrencyOrderSchema, "parse")
        .mockReturnValue(validBody);
      jest
        .spyOn(CryptocurrencyOrderService.prototype, "update")
        .mockResolvedValue("success");

      await controller.update(req as any, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith("success");
    });

    it("例外発生時は例外がthrowされる", async () => {
      const req = mockRequest(validBody);
      const res = mockResponse();

      jest
        .spyOn(schema.updateCryptocurrencyOrderSchema, "parse")
        .mockImplementation(() => {
          throw new Error();
        });

      await expect(controller.update(req as any, res)).rejects.toThrow();
    });
  });
});
