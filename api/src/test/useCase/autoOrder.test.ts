import { autoOrder } from "../../useCase/autoOrder";
import CryptocurrencyOrderService from "../../service/cryptocurrencyOrderService";
import GmoApiService from "../../service/GmoApiService";
import GmoService from "../../service/gmoService";
import LineService from "../../service/lineService";
import LineApiService from "../../service/lineApiService";
import { ORDER_TYPE, ORDER_SIDE } from "../../service/constants";

jest.mock("../../service/cryptocurrencyOrderService");
jest.mock("../../service/gmoService");
jest.mock("../../service/gmoApiService");
jest.mock("../../service/lineService");
jest.mock("../../service/lineApiService");

describe("autoOrder", () => {
  const mockList = jest.fn();
  const mockFetchTradingRateList = jest.fn();
  const mockGmoFind = jest.fn();
  const mockLineFind = jest.fn();
  const mockOrder = jest.fn();
  const mockSendMessage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (CryptocurrencyOrderService as jest.Mock).mockImplementation(() => ({
      list: mockList,
    }));

    (GmoService as jest.Mock).mockImplementation(() => ({
      find: mockGmoFind,
    }));

    (GmoApiService as jest.Mock).mockImplementation(() => ({
      fetchTradingRateList: mockFetchTradingRateList,
      order: mockOrder,
    }));

    (LineService as jest.Mock).mockImplementation(() => ({
      find: mockLineFind,
    }));
    (LineApiService as jest.Mock).mockImplementation(() => ({
      sendMessage: mockSendMessage,
    }));
  });

  it("何も注文がないときは何もしない", async () => {
    mockList.mockResolvedValue(null);

    await autoOrder();

    expect(mockFetchTradingRateList).not.toHaveBeenCalled();
    expect(mockSendMessage).not.toHaveBeenCalled();
    expect(mockOrder).not.toHaveBeenCalled();
  });

  it("Gmo設定がないときは何もしない", async () => {
    mockList.mockResolvedValue([
      { type: ORDER_TYPE.BUY, symbol: "BTC", targetPrice: 5000, volume: 0.01 },
    ]);
    mockFetchTradingRateList.mockResolvedValue([
      {
        symbol: "BTC",
        last: "4900",
        ask: "",
        bid: "",
        high: "",
        low: "",
        timestamp: "",
        volume: "",
      },
    ]);
    mockGmoFind.mockResolvedValue(null);
    await autoOrder();
    expect(mockSendMessage).not.toHaveBeenCalled();
    expect(mockOrder).not.toHaveBeenCalled();
  });

  it("レート取得失敗で何もしない", async () => {
    mockList.mockResolvedValue([
      { type: ORDER_TYPE.BUY, symbol: "BTC", targetPrice: 5000, volume: 0.01 },
    ]);

    mockFetchTradingRateList.mockResolvedValue(null);
    mockGmoFind.mockResolvedValue({
      apiKey: "testApiKey",
      secretKey: "testSecretKey",
    });
    await autoOrder();

    expect(mockSendMessage).not.toHaveBeenCalled();
    expect(mockOrder).not.toHaveBeenCalled();
  });

  it("BUY条件を満たし、注文成功する", async () => {
    mockList.mockResolvedValue([
      { type: ORDER_TYPE.BUY, symbol: "BTC", targetPrice: 5000, volume: 0.01 },
      { type: ORDER_TYPE.SELL, symbol: "BTC", targetPrice: 6000, volume: 0.01 },
    ]);

    mockGmoFind.mockResolvedValue({
      apiKey: "testApiKey",
      secretKey: "testSecretKey",
    });

    mockFetchTradingRateList.mockResolvedValue([
      {
        symbol: "BTC",
        last: "4900",
        ask: "",
        bid: "",
        high: "",
        low: "",
        timestamp: "",
        volume: "",
      },
    ]);
    mockLineFind.mockResolvedValue({
      userId: "testUserId",
      channelAccessToken: "testChannelAccessToken",
    });

    mockOrder.mockResolvedValue("success");

    await expect(autoOrder()).resolves.not.toThrow();
  });

  it("SELL条件を満たし、注文成功する", async () => {
    mockList.mockResolvedValue([
      { type: ORDER_TYPE.SELL, symbol: "BTC", targetPrice: 6000, volume: 0.01 },
    ]);

    mockGmoFind.mockResolvedValue({
      apiKey: "testApiKey",
      secretKey: "testSecretKey",
    });

    mockFetchTradingRateList.mockResolvedValue([
      {
        symbol: "BTC",
        last: "6100",
        ask: "",
        bid: "",
        high: "",
        low: "",
        timestamp: "",
        volume: "",
      },
    ]);

    mockOrder.mockResolvedValue("success");

    mockLineFind.mockResolvedValue({
      userId: "testUserId",
      channelAccessToken: "testChannelAccessToken",
    });

    await expect(autoOrder()).resolves.not.toThrow();
  });

  it("注文条件を満たさない場合は何もしない", async () => {
    mockList.mockResolvedValue([
      { type: ORDER_TYPE.BUY, symbol: "BTC", targetPrice: 5000, volume: 0.01 },
    ]);

    mockFetchTradingRateList.mockResolvedValue([
      {
        symbol: "BTC",
        last: "5100",
        ask: "",
        bid: "",
        high: "",
        low: "",
        timestamp: "",
        volume: "",
      },
    ]);

    await autoOrder();

    expect(mockSendMessage).not.toHaveBeenCalled();
    expect(mockOrder).not.toHaveBeenCalled();
  });
});
