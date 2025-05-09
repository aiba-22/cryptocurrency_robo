import { z } from "zod";

export const createCryptocurrencyOrderSchema = z.object({
  symbol: z.string(),
  targetPrice: z.number().positive(),
  volume: z.number().positive(),
  type: z.number(),
  isEnabled: z.number(),
});

export const updateCryptocurrencyOrderSchema = z.object({
  id: z.number(),
  symbol: z.string(),
  targetPrice: z.number().positive(),
  volume: z.number().positive(),
  type: z.number(),
  isEnabled: z.number(),
});
