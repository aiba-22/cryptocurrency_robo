import {
  createLineSchema,
  updateLineSchema,
  getLineSchema,
} from "../../schema/lineSchema";
import { ZodError } from "zod";

describe("lineSchema", () => {
  describe("getLineSchema", () => {
    describe("id", () => {
      const invalidValues = [undefined, null, "1", 0, -1];
      it.each(invalidValues)(
        "不正な値の場合、バリデーションエラーが発生する",
        (value) => {
          const invalidData = {
            id: value,
          };

          expect(() => getLineSchema.parse(invalidData)).toThrow(ZodError);
        }
      );
    });

    it("有効な値の時、バリデーションが通る", () => {
      const validData = {
        id: 1,
      };

      expect(() => getLineSchema.parse(validData)).not.toThrow();
    });
  });

  describe("createLineSchema", () => {
    describe("channelAccessToken", () => {
      const invalidValues = [undefined, null, ""];
      it.each(invalidValues)(
        "不正な値の場合、バリデーションエラーが発生する",
        (value) => {
          const invalidData = {
            channelAccessToken: value,
            lineUserId: "validLineUserId",
          };

          expect(() => createLineSchema.parse(invalidData)).toThrow(ZodError);
        }
      );
    });

    describe("lineUserId", () => {
      const invalidValues = [undefined, null, ""];
      it.each(invalidValues)(
        "不正な値の場合、バリデーションエラーが発生する",
        (value) => {
          const invalidData = {
            channelAccessToken: "validChannelAccessToken",
            lineUserId: value,
          };

          expect(() => createLineSchema.parse(invalidData)).toThrow(ZodError);
        }
      );
    });

    it("有効な値の時、バリデーションが通る", () => {
      const validData = {
        channelAccessToken: "validChannelAccessToken",
        lineUserId: "validLineUserId",
      };

      expect(() => createLineSchema.parse(validData)).not.toThrow();
    });
  });

  describe("updateLineSchema", () => {
    describe("id", () => {
      const invalidValues = [undefined, null, "1", 0, -1];
      it.each(invalidValues)(
        "不正な値の場合、バリデーションエラーが発生する",
        (value) => {
          const invalidData = {
            id: value,
            channelAccessToken: "invalidChannelAccessToken",
            lineUserId: "validLineUserId",
          };

          expect(() => updateLineSchema.parse(invalidData)).toThrow(ZodError);
        }
      );
    });

    describe("channelAccessToken", () => {
      const invalidValues = [undefined, null, ""];
      it.each(invalidValues)(
        "不正な値の場合、バリデーションエラーが発生する",
        (value) => {
          const invalidData = {
            id: 1,
            channelAccessToken: value,
            lineUserId: "validLineUserId",
          };

          expect(() => updateLineSchema.parse(invalidData)).toThrow(ZodError);
        }
      );
    });

    describe("lineUserId", () => {
      const invalidValues = [undefined, null, ""];
      it.each(invalidValues)(
        "不正な値の場合、バリデーションエラーが発生する",
        (value) => {
          const invalidData = {
            id: 1,
            channelAccessToken: "validChannelAccessToken",
            lineUserId: value,
          };

          expect(() => updateLineSchema.parse(invalidData)).toThrow(ZodError);
        }
      );
    });

    it("有効な値の時、バリデーションが通る", () => {
      const validData = {
        id: 1,
        channelAccessToken: "validChannelAccessToken",
        lineUserId: "validLineUserId",
      };

      expect(() => updateLineSchema.parse(validData)).not.toThrow();
    });
  });
});
