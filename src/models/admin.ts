import z from "zod";

export const adminCreationSchema = z.object({
  email: z.string().email(),
  alias: z.string(),
  pass: z.string()
});

export type AdminCreationData = z.infer<typeof adminCreationSchema>;
