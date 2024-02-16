import z from "zod";

export const joinSchema = z.object({
  biography: z.string().max(100),
});

export type User = z.infer<typeof joinSchema>;