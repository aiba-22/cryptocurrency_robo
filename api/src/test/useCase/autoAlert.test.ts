import { autoAlert } from "../../useCase/autoAlert";
import GmoService from "../../service/gmo";
import PriceAlertService from "../../service/priceAlert";
import LineService from "../../service/line";

jest.mock("../../service/gmo");
jest.mock("../../service/priceAlert");
jest.mock("../../service/line");

describe("autoAlert", () => {
  const mockPriceAlertServiceFind = jest.fn();
  const mockFetchTradingPrice = jest.fn();
  const mockSendMessage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (PriceAlertService as jest.Mock).mockImplementation(() => ({
      find: mockPriceAlertServiceFind,
    }));

    (GmoService as jest.Mock).mockImplementation(() => ({
      fetchTradingPrice: mockFetchTradingPrice,
    }));

    (LineService as jest.Mock).mockImplementation(() => ({
      sendMessage: mockSendMessage,
    }));
  });

  it("価格が上限を超えた場合に通知される", async () => {
    mockPriceAlertServiceFind.mockResolvedValue({
      id: 1,
      conditions: {
        isUpperLimit: true,
        price: 1000,
        symbol: "BTC",
      },
    });

    mockFetchTradingPrice.mockResolvedValue(1100);

    await autoAlert();

    expect(mockSendMessage).toHaveBeenCalledWith("現在の価格は1100円です。");
  });

  it("価格が下限を下回った場合に通知される", async () => {
    mockPriceAlertServiceFind.mockResolvedValue({
      id: 1,
      conditions: {
        isUpperLimit: false,
        price: 1000,
        symbol: "BTC",
      },
    });

    mockFetchTradingPrice.mockResolvedValue(900);

    await autoAlert();

    expect(mockSendMessage).toHaveBeenCalledWith("現在の価格は900円です。");
  });

  it("価格が上限を超えていない場合は通知されない", async () => {
    mockPriceAlertServiceFind.mockResolvedValue({
      id: 1,
      conditions: {
        isUpperLimit: true,
        price: 1000,
        symbol: "BTC",
      },
    });

    mockFetchTradingPrice.mockResolvedValue(950);

    await autoAlert();

    expect(mockSendMessage).not.toHaveBeenCalled();
  });

  it("価格アラート情報がない場合、何もしない", async () => {
    mockPriceAlertServiceFind.mockResolvedValue(undefined);

    await autoAlert();

    expect(mockFetchTradingPrice).not.toHaveBeenCalled();
    expect(mockSendMessage).not.toHaveBeenCalled();
  });

  it("現在価格が取得できない場合、通知されない", async () => {
    mockPriceAlertServiceFind.mockResolvedValue({
      id: 1,
      conditions: {
        isUpperLimit: true,
        price: 1000,
        symbol: "BTC",
      },
    });

    mockFetchTradingPrice.mockResolvedValue(undefined);

    await autoAlert();

    expect(mockSendMessage).not.toHaveBeenCalled();
  });
});
