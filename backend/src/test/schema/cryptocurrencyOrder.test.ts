import {
  createCryptocurrencyStaticOrderSchema,
  updateCryptocurrencyStaticOrderSchema,
} from "../../schema/cryptocurrencyStaticOrderSchema";
import { ZodError } from "zod";

describe("cryptocurrencyStaticOrderSchema", () => {
  describe("createCryptocurrencyStaticOrderSchema", () => {
    describe("symbol", () => {
      const invalidValues = [undefined, null, ""];
      it.each(invalidValues)(
        "不正な値の時、バリデーションエラーが発生する",
        (value) => {
          const invalidData = {
            symbol: value,
            targetPrice: 50000,
            volume: 1,
            type: 1,
            isEnabled: 1,
          };

          expect(() =>
            createCryptocurrencyStaticOrderSchema.parse(invalidData)
          ).toThrow(ZodError);
        }
      );
    });

    describe("targetPrice", () => {
      const invalidValues = [undefined, null, -1, 0, "1"];
      it.each(invalidValues)(
        "不正な値の場合、バリデーションエラーが発生する",
        (value) => {
          const invalidData = {
            symbol: "BTC",
            targetPrice: value,
            volume: 1,
            type: 1,
            isEnabled: 1,
          };

          expect(() =>
            createCryptocurrencyStaticOrderSchema.parse(invalidData)
          ).toThrow(ZodError);
        }
      );
    });

    describe("volume", () => {
      const invalidValues = [undefined, null, -1, 0, "1"];
      it.each(invalidValues)(
        "不正な値の場合、バリデーションエラーが発生する",
        (value) => {
          const invalidData = {
            symbol: "BTC",
            targetPrice: 50000,
            volume: value,
            type: 1,
            isEnabled: 1,
          };

          expect(() =>
            createCryptocurrencyStaticOrderSchema.parse(invalidData)
          ).toThrow(ZodError);
        }
      );
    });

    describe("type", () => {
      const invalidValues = [undefined, null, -1];
      it.each(invalidValues)(
        "不正な値の場合、バリデーションエラーが発生する",
        (value) => {
          const invalidData = {
            symbol: "BTC",
            targetPrice: 50000,
            volume: 1,
            type: value,
            isEnabled: 1,
          };

          expect(() =>
            createCryptocurrencyStaticOrderSchema.parse(invalidData)
          ).toThrow(ZodError);
        }
      );
    });

    describe("isEnabled", () => {
      const invalidValues = [undefined, null, "1", 2];
      it.each(invalidValues)(
        "不正な値の場合、バリデーションエラーが発生する",
        (value) => {
          const invalidData = {
            symbol: "BTC",
            targetPrice: 50000,
            volume: 1,
            type: 1,
            isEnabled: value,
          };

          expect(() =>
            createCryptocurrencyStaticOrderSchema.parse(invalidData)
          ).toThrow(ZodError);
        }
      );
    });

    it("有効な値の時バリデーションが通る", () => {
      const validData = {
        symbol: "BTC",
        targetPrice: 50000,
        volume: 1,
        type: 1,
        isEnabled: 1,
      };

      expect(() =>
        createCryptocurrencyStaticOrderSchema.parse(validData)
      ).not.toThrow();
    });
  });

  describe("updateCryptocurrencyStaticOrderSchema", () => {
    describe("id", () => {
      const invalidValues = [undefined, null, "1", 0, -1];
      it.each(invalidValues)(
        "不正な値の時、バリデーションエラーが発生する",
        (value) => {
          const invalidData = {
            id: value,
            symbol: "BTC",
            targetPrice: 50000,
            volume: 1,
            type: 1,
            isEnabled: 1,
          };

          expect(() =>
            updateCryptocurrencyStaticOrderSchema.parse(invalidData)
          ).toThrow(ZodError);
        }
      );
    });

    describe("symbol", () => {
      const invalidValues = [undefined, null, ""];
      it.each(invalidValues)(
        "不正な値の時、バリデーションエラーが発生する",
        (value) => {
          const invalidData = {
            id: 1,
            symbol: value,
            targetPrice: 50000,
            volume: 1,
            type: 1,
            isEnabled: 1,
          };

          expect(() =>
            updateCryptocurrencyStaticOrderSchema.parse(invalidData)
          ).toThrow(ZodError);
        }
      );
    });

    describe("targetPrice", () => {
      const invalidValues = [undefined, null, -1, 0, "1"];
      it.each(invalidValues)(
        "不正な値の場合、バリデーションエラーが発生する",
        (value) => {
          const invalidData = {
            id: 1,
            symbol: "BTC",
            targetPrice: value,
            volume: 1,
            type: 1,
            isEnabled: 1,
          };

          expect(() =>
            updateCryptocurrencyStaticOrderSchema.parse(invalidData)
          ).toThrow(ZodError);
        }
      );
    });

    describe("volume", () => {
      const invalidValues = [undefined, null, -1, 0, "1"];
      it.each(invalidValues)(
        "不正な値の場合、バリデーションエラーが発生する",
        (value) => {
          const invalidData = {
            id: 1,
            symbol: "BTC",
            targetPrice: 50000,
            volume: value,
            type: 1,
            isEnabled: 1,
          };

          expect(() =>
            updateCryptocurrencyStaticOrderSchema.parse(invalidData)
          ).toThrow(ZodError);
        }
      );
    });

    describe("type", () => {
      const invalidValues = [undefined, null, -1];
      it.each(invalidValues)(
        "不正な値の場合、バリデーションエラーが発生する",
        (value) => {
          const invalidData = {
            id: 1,
            symbol: "BTC",
            targetPrice: 50000,
            volume: 1,
            type: value,
            isEnabled: 1,
          };

          expect(() =>
            updateCryptocurrencyStaticOrderSchema.parse(invalidData)
          ).toThrow(ZodError);
        }
      );
    });

    describe("isEnabled", () => {
      const invalidValues = [undefined, null, "1", 2];
      it.each(invalidValues)(
        "不正な値の場合、バリデーションエラーが発生する",
        (value) => {
          const invalidData = {
            id: 1,
            symbol: "BTC",
            targetPrice: 50000,
            volume: 1,
            type: 1,
            isEnabled: value,
          };

          expect(() =>
            updateCryptocurrencyStaticOrderSchema.parse(invalidData)
          ).toThrow(ZodError);
        }
      );
    });

    it("有効な値の時バリデーションが通る", () => {
      const validData = {
        id: 1,
        symbol: "BTC",
        targetPrice: 50000,
        volume: 1,
        type: 1,
        isEnabled: 1,
      };

      expect(() =>
        updateCryptocurrencyStaticOrderSchema.parse(validData)
      ).not.toThrow();
    });
  });
});
