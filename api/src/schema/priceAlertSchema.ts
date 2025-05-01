import { z } from "zod";

export const createPriceAlertSchema = z.object({
  conditions: z.object({
    isUpperLimit: z.boolean(),
    symbol: z.string(),
    price: z.number(),
  }),
});

export const updatePriceAlertSchema = z.object({
  id: z.number(),
  conditions: z.object({
    isUpperLimit: z.boolean(),
    symbol: z.string(),
    price: z.number(),
  }),
});
