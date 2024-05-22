import z from "zod";

export type AuthPayload = {
  username: string
  email: string
};

export const loginCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export type LoginCredentials = z.infer<typeof loginCredentialsSchema>;
