import { z } from "zod";

export const getLineSchema = z.object({
  id: z.number(),
});
export const createLineSchema = z.object({
  channelAccessToken: z.string(),
  userId: z.string(),
});

export const updateLineSchema = z.object({
  id: z.number(),
  channelAccessToken: z.string(),
  userId: z.string(),
});

export const lineNotificationSchema = z.object({ message: z.string() });
