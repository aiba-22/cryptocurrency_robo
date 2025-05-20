import { get } from "../../controllers/cryptocurrencyRateController";
import GmoApiService from "../../service/gmoApiService";

const mockResponse = () => {
  const res = {} as any;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
const mockRequest = (body: any) => ({ body });
const req = mockRequest({});

describe("cryptocurrencyRateControllerのテスト", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("正常時はjsonで結果を返す", async () => {
    const res = mockResponse();

    const mockResult = [
      {
        ask: "50200.50",
        bid: "50100.25",
        high: "51000.00",
        last: "50150.00",
        low: "49500.00",
        symbol: "BTC",
        timestamp: "1715744400000",
        volume: "123.456",
      },
    ];
    jest
      .spyOn(GmoApiService.prototype, "fetchTradingRateList")
      .mockResolvedValue(mockResult);

    await get(req as any, res);

    expect(res.json).toHaveBeenCalledWith(mockResult);
  });

  it("例外発生時は例外がthrowされる", async () => {
    const req = mockRequest({});
    const res = mockResponse();

    jest
      .spyOn(GmoApiService.prototype, "fetchTradingRateList")
      .mockImplementation(() => {
        throw new Error();
      });

    await expect(get(req as any, res)).rejects.toThrow();
  });
});
