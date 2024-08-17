import { z } from "zod";

export const createNotificationSchema = z.object({
  virtualCurrencyType: z.string(),
  targetPrice: z.number(),
  lineToken: z.string(),
});

export const updateNotificationSchema = z.object({
  id: z.number(),
  virtualCurrencyType: z.string(),
  targetPrice: z.number(),
  lineToken: z.string(),
});
