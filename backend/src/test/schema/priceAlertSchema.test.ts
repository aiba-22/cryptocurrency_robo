import {
  createPriceAlertSchema,
  updatePriceAlertSchema,
} from "../../schema/priceAlertSchema";
import { ZodError } from "zod";

describe("priceAlertSchema", () => {
  describe("createPriceAlertSchema", () => {
    describe("isUpperLimit", () => {
      const invalidValues = [undefined, null, "true", "false", 1, 0];
      it.each(invalidValues)(
        "不正な値の場合、バリデーションエラーが発生する",
        (value) => {
          const invalidData = {
            conditions: {
              isUpperLimit: value,
              symbol: "BTC",
              price: 100,
            },
          };

          expect(() => createPriceAlertSchema.parse(invalidData)).toThrow(
            ZodError
          );
        }
      );
    });

    describe("symbol", () => {
      const invalidValues = [undefined, null, "", 123, true];
      it.each(invalidValues)(
        "不正な値の場合、バリデーションエラーが発生する",
        (value) => {
          const invalidData = {
            conditions: {
              isUpperLimit: true,
              symbol: value,
              price: 100,
            },
          };

          expect(() => createPriceAlertSchema.parse(invalidData)).toThrow(
            ZodError
          );
        }
      );
    });

    describe("price", () => {
      const invalidValues = [undefined, null, "", "100", -100, 0];
      it.each(invalidValues)(
        "不正な値の場合、バリデーションエラーが発生する",
        (value) => {
          const invalidData = {
            conditions: {
              isUpperLimit: true,
              symbol: "BTC",
              price: value,
            },
          };

          expect(() => createPriceAlertSchema.parse(invalidData)).toThrow(
            ZodError
          );
        }
      );
    });

    it("有効な値の時、バリデーションが通る", () => {
      const validData = {
        conditions: {
          isUpperLimit: true,
          symbol: "BTC",
          price: 100,
        },
      };

      expect(() => createPriceAlertSchema.parse(validData)).not.toThrow();
    });
  });

  describe("updatePriceAlertSchema", () => {
    describe("id", () => {
      const invalidValues = [undefined, null, "1", 0, -1];
      it.each(invalidValues)(
        "不正な値の場合、バリデーションエラーが発生する",
        (value) => {
          const invalidData = {
            id: value,
            conditions: {
              isUpperLimit: true,
              symbol: "BTC",
              price: 100,
            },
          };

          expect(() => updatePriceAlertSchema.parse(invalidData)).toThrow(
            ZodError
          );
        }
      );
    });

    describe("isUpperLimit", () => {
      const invalidValues = [undefined, null, "true", "false", 1, 0];
      it.each(invalidValues)(
        "不正な値の場合、バリデーションエラーが発生する",
        (value) => {
          const invalidData = {
            id: 1,
            conditions: {
              isUpperLimit: value,
              symbol: "BTC",
              price: 100,
            },
          };

          expect(() => updatePriceAlertSchema.parse(invalidData)).toThrow(
            ZodError
          );
        }
      );
    });
    describe("symbol", () => {
      const invalidValues = [undefined, null, "", 123, true];
      it.each(invalidValues)(
        "不正な値の場合、バリデーションエラーが発生する",
        (value) => {
          const invalidData = {
            id: 1,
            conditions: {
              isUpperLimit: true,
              symbol: value,
              price: 100,
            },
          };

          expect(() => updatePriceAlertSchema.parse(invalidData)).toThrow(
            ZodError
          );
        }
      );
    });
    describe("price", () => {
      const invalidValues = [undefined, null, "", "100", -100, 0];
      it.each(invalidValues)(
        "不正な値の場合、バリデーションエラーが発生する",
        (value) => {
          const invalidData = {
            id: 1,
            conditions: {
              isUpperLimit: true,
              symbol: "BTC",
              price: value,
            },
          };

          expect(() => updatePriceAlertSchema.parse(invalidData)).toThrow(
            ZodError
          );
        }
      );
    });
    it("有効な値の時、バリデーションが通る", () => {
      const validData = {
        id: 1,
        conditions: {
          isUpperLimit: true,
          symbol: "BTC",
          price: 100,
        },
      };

      expect(() => updatePriceAlertSchema.parse(validData)).not.toThrow();
    });
  });
});
