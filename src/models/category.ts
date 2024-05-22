import z from "zod";

export const categoryCreationSchema = z.object({
  name: z.string()
});

export type CategoryCreationData = z.infer<typeof categoryCreationSchema>;
