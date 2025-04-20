import { z } from "zod";

export const getGmoSchema = z.object({
  id: z.number(),
});

export const createGmoSchema = z.object({
  apiKey: z.string(),
  secretKey: z.string(),
});

export const upedateGmoSchema = z.object({
  id: z.number(),
  apiKey: z.string(),
  secretKey: z.string(),
});
