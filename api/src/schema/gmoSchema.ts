import { z } from "zod";

export const createGmoSchema = z.object({
  apiKey: z.string(),
  secretKey: z.string(),
});

export const upedateGmoSchema = z.object({
  id: z.number(),
  apiKey: z.string(),
  secretKey: z.string(),
});
