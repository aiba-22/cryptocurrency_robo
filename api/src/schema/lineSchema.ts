import { z } from "zod";

export const getLineSchema = z.object({
  id: z.number(),
});
export const createLineSchema = z.object({
  lineToken: z.string(),
  userId: z.string(),
});

export const upedateLineSchema = z.object({
  id: z.number(),
  lineToken: z.string(),
  userId: z.string(),
});

export const lineNotificationSchema = z.object({ price: z.number() });
