import { testAlert } from "../../useCase/testAlert";
import LineService from "../../service/lineService";
import LineApiService from "../../service/lineApiService";

jest.mock("../../service/gmoService");
jest.mock("../../service/gmoApiService");
jest.mock("../../service/lineService");
jest.mock("../../service/lineApiService");

describe("testAlert", () => {
  const mockLineServiceFind = jest.fn();
  const mockSendMessage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (LineService as jest.Mock).mockImplementation(() => ({
      find: mockLineServiceFind,
    }));

    (LineApiService as jest.Mock).mockImplementation(() => ({
      sendMessage: mockSendMessage,
    }));
  });

  it("正常系: メッセージが送信される", async () => {
    mockLineServiceFind.mockResolvedValue({
      userId: "testUserId",
      channelAccessToken: "testChannelAccessToken",
    });

    await expect(testAlert("test_message")).resolves.toEqual("success");
    expect(mockSendMessage).toHaveBeenCalledWith({
      message: "test_message",
      userId: "testUserId",
      channelAccessToken: "testChannelAccessToken",
    });
  });

  it("異常系: Line設定がない場合", async () => {
    mockLineServiceFind.mockResolvedValue(null);

    await expect(testAlert("test_message")).resolves.toBeUndefined();
    expect(mockSendMessage).not.toHaveBeenCalled();
  });

  it("異常系: メッセージ送信に失敗した場合", async () => {
    mockLineServiceFind.mockResolvedValue({
      userId: "testUserId",
      channelAccessToken: "testChannelAccessToken",
    });
    mockSendMessage.mockRejectedValue(new Error("Network error"));

    await expect(testAlert("Test message")).resolves.toEqual("failure");
  });
});
