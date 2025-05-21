import { sendTestNotification } from "../../useCase/sendLineNotification";
import LineService from "../../service/lineService";
import LineApiService from "../../service/lineApiService";

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

  it("メッセージの送信結果を返す", async () => {
    mockLineServiceFind.mockResolvedValue({
      userId: "testUserId",
      channelAccessToken: "testChannelAccessToken",
    });
    mockSendMessage.mockResolvedValue("success");
    await expect(sendTestNotification("testMessage")).resolves.toEqual(
      "success"
    );
    expect(mockSendMessage).toHaveBeenCalledWith("testMessage");
  });

  it("Line設定がない場合systemErrorを返す", async () => {
    mockLineServiceFind.mockResolvedValue(null);

    await expect(sendTestNotification("testMessage")).resolves.toEqual(
      "systemError"
    );
    expect(mockSendMessage).not.toHaveBeenCalled();
  });
});
