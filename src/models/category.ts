import z from "zod";

export const categoryCreationSchema = z.object({
  name: z.string(),
  coverUrl: z.string().url(),
  allowImage: z.boolean().optional(),
  allowVideo: z.boolean().optional(),
  allowText: z.boolean().optional(),
});

export type CategoryCreationData = z.infer<typeof categoryCreationSchema>;
