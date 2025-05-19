import { lineNotification } from "../../controllers/notificationController";
import LineNotificationService from "../../service/line";
import { lineNotificationSchema } from "../../schema/lineSchema";
const mockResponse = () => {
  const res = {} as any;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
const mockRequest = (body: any) => ({ body });
const req = mockRequest({});

describe("lineNotificationControllerのテスト", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("正常時はjsonで結果を返す", async () => {
    const res = mockResponse();
    const validBody = { message: "test message" };

    jest.spyOn(lineNotificationSchema, "parse").mockReturnValue(validBody);
    jest
      .spyOn(LineNotificationService.prototype, "sendMessage")
      .mockResolvedValue("success");

    await lineNotification(req as any, res);

    expect(res.json).toHaveBeenCalledWith("success");
  });

  it("例外発生時は例外がthrowされる", async () => {
    const req = mockRequest({});
    const res = mockResponse();

    jest.spyOn(lineNotificationSchema, "parse").mockImplementation(() => {
      throw new Error("バリデーションエラー");
    });

    await expect(lineNotification(req as any, res)).rejects.toThrow(
      "バリデーションエラー"
    );
  });
});
