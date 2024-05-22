import z from "zod";

export const createContentSchema = z.object({
  name: z.string(),
  fileURL: z.string().url()
});

export type CreateContentRequest = z.infer<typeof createContentSchema>;
