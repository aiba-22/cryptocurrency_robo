import { autoOrder } from "../../useCase/autoOrder";
import CryptocurrencyOrderService from "../../service/cryptocurrencyOrder";
import GmoService from "../../service/gmo";
import LineService from "../../service/line";
import { ORDER_TYPE, ORDER_SIDE } from "../../service/constants";

jest.mock("../../service/cryptocurrencyOrder");
jest.mock("../../service/gmo");
jest.mock("../../service/line");

describe("autoOrder", () => {
  const mockList = jest.fn();
  const mockFetchTradingRateList = jest.fn();
  const mockOrder = jest.fn();
  const mockSendMessage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (CryptocurrencyOrderService as jest.Mock).mockImplementation(() => ({
      list: mockList,
    }));

    (GmoService as jest.Mock).mockImplementation(() => ({
      fetchTradingRateList: mockFetchTradingRateList,
      order: mockOrder,
    }));

    (LineService as jest.Mock).mockImplementation(() => ({
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

  it("レート取得失敗で何もしない", async () => {
    mockList.mockResolvedValue([
      { type: ORDER_TYPE.BUY, symbol: "BTC", targetPrice: 5000, volume: 0.01 },
    ]);
    mockFetchTradingRateList.mockResolvedValue(undefined);

    await autoOrder();

    expect(mockSendMessage).not.toHaveBeenCalled();
    expect(mockOrder).not.toHaveBeenCalled();
  });

  it("BUY条件を満たし、注文成功する", async () => {
    mockList.mockResolvedValue([
      { type: ORDER_TYPE.BUY, symbol: "BTC", targetPrice: 5000, volume: 0.01 },
      { type: ORDER_TYPE.SELL, symbol: "BTC", targetPrice: 6000, volume: 0.01 },
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

    mockOrder.mockResolvedValue("success");

    await autoOrder();

    expect(mockSendMessage).toHaveBeenCalledWith(
      "チェック中です、買い判定：true,売り判定：false"
    );
    expect(mockOrder).toHaveBeenCalledWith({
      symbol: "BTC",
      side: ORDER_SIDE.BUY,
      price: 5000,
      size: 0.01,
    });
    expect(mockSendMessage).toHaveBeenCalledWith("売り注文に成功しました。");
  });

  it("SELL条件を満たし、注文失敗する", async () => {
    mockList.mockResolvedValue([
      { type: ORDER_TYPE.SELL, symbol: "BTC", targetPrice: 6000, volume: 0.01 },
    ]);

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

    mockOrder.mockResolvedValue("failure");

    await autoOrder();

    expect(mockSendMessage).toHaveBeenCalledWith(
      "チェック中です、買い判定：false,売り判定：true"
    );
    expect(mockOrder).toHaveBeenCalledWith({
      symbol: "BTC",
      side: ORDER_SIDE.SELL,
      price: 6000,
      size: 0.01,
    });
    expect(mockSendMessage).toHaveBeenCalledWith("買い注文に失敗しました。");
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

    expect(mockSendMessage).toHaveBeenCalledWith(
      "チェック中です、買い判定：false,売り判定：false"
    );
    expect(mockOrder).not.toHaveBeenCalled();
  });
});
