import { sendTestNotification } from "../../useCase/sendLineNotification";
import LineService from "../../service/lineService";
import LineApiService from "../../service/lineApiService";

jest.mock("../../service/gmoService");
jest.mock("../../service/gmoApiService");
jest.mock("../../service/lineService");
jest.mock("../../service/lineApiService");

describe("sendTestNotification", () => {
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

    await expect(sendTestNotification("testMessage")).resolves.toEqual(
      "success"
    );
    expect(mockSendMessage).toHaveBeenCalledWith("testMessage");
  });

  it("異常系: Line設定がない場合", async () => {
    mockLineServiceFind.mockResolvedValue(null);

    await expect(sendTestNotification("testMessage")).resolves.toBeUndefined();
    expect(mockSendMessage).not.toHaveBeenCalled();
  });

  it("異常系: メッセージ送信に失敗した場合", async () => {
    mockLineServiceFind.mockResolvedValue({
      userId: "testUserId",
      channelAccessToken: "testChannelAccessToken",
    });
    mockSendMessage.mockRejectedValue(new Error());

    await expect(sendTestNotification("testMessage")).resolves.toEqual(
      "failure"
    );
  });
});
