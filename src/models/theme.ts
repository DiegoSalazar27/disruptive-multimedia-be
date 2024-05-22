import z from "zod";

export const themeCreationSchema = z.object({
  name: z.string()
});

export type ThemeCreationData = z.infer<typeof themeCreationSchema>;
