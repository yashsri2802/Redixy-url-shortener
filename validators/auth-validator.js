import z from "zod";

const nameSchema = z
  .string()
  .trim()
  .min(3, { message: "Name must be at least 3 characters long." })
  .max(100, { message: "Name must be no more than 100 characters." });

const emailSchema = z
  .string()
  .trim()
  .email({ message: "Please enter a valid email address." })
  .max(100, { message: "Email must be no more than 100 characters." });

export const loginUserSchema = z.object({
  email: emailSchema,

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100, { message: "Password must be no more than 100 characters." }),
});

export const registerUserSchema = loginUserSchema.extend({
  name: nameSchema,
});

export const verifyEmailSchema = z.object({
  token: z.string().trim().length(8),
  email: z.string().trim().email(),
});
