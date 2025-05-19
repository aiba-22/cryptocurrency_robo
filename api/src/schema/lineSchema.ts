import { z } from "zod";

export const getLineSchema = z.object({
  id: z.number().positive(),
});
export const createLineSchema = z.object({
  channelAccessToken: z.string().min(1),
  userId: z.string().min(1),
});

export const updateLineSchema = z.object({
  id: z.number().positive(),
  channelAccessToken: z.string().min(1),
  userId: z.string().min(1),
});

export const lineNotificationSchema = z.object({ message: z.string() });
