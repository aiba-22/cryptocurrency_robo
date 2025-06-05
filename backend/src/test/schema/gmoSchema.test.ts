import { createGmoSchema, updateGmoSchema } from "../../schema/gmoSchema";
import { ZodError } from "zod";

describe("gmoSchema", () => {
  describe("createGmoSchema", () => {
    describe("apiKey", () => {
      const invalidValues = [undefined, null, ""];
      it.each(invalidValues)(
        "不正な値の場合、バリデーションエラーが発生する",
        (value) => {
          const invalidData = {
            apiKey: value,
            secretKey: "validSecretKey",
          };

          expect(() => createGmoSchema.parse(invalidData)).toThrow(ZodError);
        }
      );
    });

    describe("secretKey", () => {
      const invalidValues = [undefined, null, ""];
      it.each(invalidValues)(
        "不正な値の場合、バリデーションエラーが発生する",
        (value) => {
          const invalidData = {
            apiKey: "validApiKey",
            secretKey: value,
          };

          expect(() => createGmoSchema.parse(invalidData)).toThrow(ZodError);
        }
      );
    });

    it("有効な値の時、バリデーションが通る", () => {
      const validData = {
        apiKey: "validApiKey",
        secretKey: "validSecretKey",
      };

      expect(() => createGmoSchema.parse(validData)).not.toThrow();
    });
  });

  describe("updateGmoSchema", () => {
    describe("id", () => {
      const invalidValues = [undefined, null, "1", 0, -1];
      it.each(invalidValues)(
        "不正な値の場合、バリデーションエラーが発生する",
        (value) => {
          const invalidData = {
            id: value,
            apiKey: "validApiKey",
            secretKey: "validSecretKey",
          };

          expect(() => updateGmoSchema.parse(invalidData)).toThrow(ZodError);
        }
      );
    });

    describe("apiKey", () => {
      const invalidValues = [undefined, null, ""];
      it.each(invalidValues)(
        "不正な値の場合、バリデーションエラーが発生する",
        (value) => {
          const invalidData = {
            id: 1,
            apiKey: value,
            secretKey: "validSecretKey",
          };

          expect(() => updateGmoSchema.parse(invalidData)).toThrow(ZodError);
        }
      );
    });

    describe("secretKey", () => {
      const invalidValues = [undefined, null, ""];
      it.each(invalidValues)(
        "不正な値の場合、バリデーションエラーが発生する",
        (value) => {
          const invalidData = {
            id: 1,
            apiKey: "validApiKey",
            secretKey: value,
          };

          expect(() => updateGmoSchema.parse(invalidData)).toThrow(ZodError);
        }
      );
    });

    it("有効な値の時、バリデーションが通る", () => {
      const validData = {
        id: 1,
        apiKey: "validApiKey",
        secretKey: "validSecretKey",
      };

      expect(() => updateGmoSchema.parse(validData)).not.toThrow();
    });
  });
});
