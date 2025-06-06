import { z } from "zod";

export const createCryptocurrencyOrderSchema = z.object({
  symbol: z.string().min(1),
  targetPrice: z.number().positive(),
  volume: z.number().positive(),
  type: z.number().int().min(0),
  priceAdjustmentRate: z.number().int().min(0),
  volumeAdjustmentRate: z.number().int().min(0),
  repeatCount: z.number().int().min(0).optional(),
  isEnabled: z.union([z.literal(0), z.literal(1)]),
});

export const updateCryptocurrencyOrderSchema = z.object({
  id: z.number().positive(),
  symbol: z.string().min(1),
  targetPrice: z.number().positive(),
  volume: z.number().positive(),
  type: z.number().int().min(0),
  priceAdjustmentRate: z.number().int().min(0),
  volumeAdjustmentRate: z.number().int().min(0),
  repeatCount: z.number().int().min(0).optional(),
  isEnabled: z.union([z.literal(0), z.literal(1)]),
});
