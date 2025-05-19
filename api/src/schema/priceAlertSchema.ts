import { z } from "zod";

export const createPriceAlertSchema = z.object({
  conditions: z.object({
    isUpperLimit: z.boolean(),
    symbol: z.string().min(1),
    price: z.number().positive(),
  }),
});

export const updatePriceAlertSchema = z.object({
  id: z.number().positive(),
  conditions: z.object({
    isUpperLimit: z.boolean(),
    symbol: z.string().min(1),
    price: z.number().positive(),
  }),
});
