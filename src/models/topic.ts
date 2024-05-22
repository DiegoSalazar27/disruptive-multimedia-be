import z from "zod";

export const topicCreationSchema = z.object({
  name: z.string()
});

export type TopicCreationData = z.infer<typeof topicCreationSchema>;
