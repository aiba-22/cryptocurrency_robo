import { sendLineTest } from "../../controllers/notificationController";
import { lineNotificationSchema } from "../../schema/lineSchema";
import { sendTestNotification } from "../../useCase/sendLineNotification";

jest.mock("../../useCase/sendLineNotification");

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

  describe("sendLineTest関数のテスト", () => {
    it("正常時はjsonで結果を返す", async () => {
      const res = mockResponse();
      const message = "test_message";
      const mockResult = "success";

      jest.spyOn(lineNotificationSchema, "parse").mockReturnValue({ message });

      (sendTestNotification as jest.Mock).mockReturnValue("success");

      await sendLineTest(req as any, res);

      expect(res.json).toHaveBeenCalledWith(mockResult);
    });

    it("例外発生時は例外がthrowされる", async () => {
      const res = mockResponse();

      jest.spyOn(lineNotificationSchema, "parse").mockImplementation(() => {
        throw new Error();
      });

      await expect(sendLineTest(req as any, res)).rejects.toThrow();
    });
  });
});
