import {
  createLineSchema,
  updateLineSchema,
  getLineSchema,
} from "../../schema/lineSchema";
import { ZodError } from "zod";

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
          userId: "validUserId",
        };

        expect(() => createLineSchema.parse(invalidData)).toThrow(ZodError);
      }
    );
  });

  describe("userId", () => {
    const invalidValues = [undefined, null, ""];
    it.each(invalidValues)(
      "不正な値の場合、バリデーションエラーが発生する",
      (value) => {
        const invalidData = {
          channelAccessToken: "validChannelAccessToken",
          userId: value,
        };

        expect(() => createLineSchema.parse(invalidData)).toThrow(ZodError);
      }
    );
  });

  it("有効な値の時、バリデーションが通る", () => {
    const validData = {
      channelAccessToken: "validChannelAccessToken",
      userId: "validSecretKey",
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
          userId: "validUserId",
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
          userId: "validUserId",
        };

        expect(() => updateLineSchema.parse(invalidData)).toThrow(ZodError);
      }
    );
  });

  describe("userId", () => {
    const invalidValues = [undefined, null, ""];
    it.each(invalidValues)(
      "不正な値の場合、バリデーションエラーが発生する",
      (value) => {
        const invalidData = {
          id: 1,
          channelAccessToken: "validChannelAccessToken",
          userId: value,
        };

        expect(() => updateLineSchema.parse(invalidData)).toThrow(ZodError);
      }
    );
  });

  it("有効な値の時、バリデーションが通る", () => {
    const validData = {
      id: 1,
      channelAccessToken: "validChannelAccessToken",
      userId: "validSecretKey",
    };

    expect(() => updateLineSchema.parse(validData)).not.toThrow();
  });
});
