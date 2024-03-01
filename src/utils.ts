import * as z from "zod";

export const userSchema = z.object({
  id: z.number().optional(),
  email: z.string().email(),
});

export const databaseSchema = z.object({
  id: z.number().optional(),
  email: z.string(),
});
