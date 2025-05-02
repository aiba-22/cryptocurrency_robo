import { z } from "zod";

export const createCryptocurrencyOrderSchema = z.array(
  z.object({
    symbol: z.string(),
    targetPrice: z.number().positive(),
    quantity: z.number().positive(),
    orderType: z.number(),
    isEnabled: z.number(),
  })
);

export const updateCryptocurrencyOrderSchema = z.array(
  z.object({
    id: z.number(),
    symbol: z.string(),
    targetPrice: z.number().positive(),
    quantity: z.number().positive(),
    orderType: z.number(),
    isEnabled: z.number(),
  })
);
