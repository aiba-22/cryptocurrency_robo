import { z } from "zod";

export const createCryptocurrencyAdjustmentOrderSchema = z.object({
  symbol: z.string().min(1),
  basePrice: z.number().positive(),
  priceAdjustmentRate: z.number().positive(),
  volumeAdjustmentRate: z.number().positive(),
  isEnabled: z.union([z.literal(0), z.literal(1)]),
});

export const updateCryptocurrencyAdjustmentOrderSchema = z.object({
  id: z.number().positive(),
  symbol: z.string().min(1),
  basePrice: z.number().positive(),
  priceAdjustmentRate: z.number().positive(),
  volumeAdjustmentRate: z.number().positive(),
  isEnabled: z.union([z.literal(0), z.literal(1)]),
});
