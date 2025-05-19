import { z } from "zod";

export const createGmoSchema = z.object({
  apiKey: z.string().min(1),
  secretKey: z.string().min(1),
});

export const updateGmoSchema = z.object({
  id: z.number().positive(),
  apiKey: z.string().min(1),
  secretKey: z.string().min(1),
});
