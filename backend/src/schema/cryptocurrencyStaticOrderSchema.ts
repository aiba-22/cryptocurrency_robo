import { z } from "zod";

export const createCryptocurrencyStaticOrderSchema = z.object({
  symbol: z.string().min(1),
  targetPrice: z.number().positive(),
  volume: z.number().positive(),
  type: z.number().int().min(0),
  isEnabled: z.union([z.literal(0), z.literal(1)]),
});

export const updateCryptocurrencyStaticOrderSchema = z.object({
  id: z.number().positive(),
  symbol: z.string().min(1),
  targetPrice: z.number().positive(),
  volume: z.number().positive(),
  type: z.number().int().min(0),
  isEnabled: z.union([z.literal(0), z.literal(1)]),
});
