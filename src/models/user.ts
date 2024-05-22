import { Role } from "@prisma/client";
import z from "zod";

export const userCreationSchema = z.object({
  email: z.string().email(),
  alias: z.string(),
  role: z.nativeEnum(Role),
  pass: z.string()
});

export type UserCreationData = z.infer<typeof userCreationSchema>;
