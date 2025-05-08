import { z } from "zod";

export const createGmoSchema = z.object({
  apiKey: z.string(),
  secretKey: z.string(),
});

export const updateGmoSchema = z.object({
  id: z.number(),
  apiKey: z.string(),
  secretKey: z.string(),
});
