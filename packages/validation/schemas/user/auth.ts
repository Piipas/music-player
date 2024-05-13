import { z } from "zod";

const usernameRegex = new RegExp(/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/gi);
const passwordRegex = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z]).*$/);

export const signinBodySchema = z.object({
  username: z
    .string({ required_error: "Username is required!" })
    .max(255)
    .regex(usernameRegex, { message: "Invalid username!" }),
  password: z
    .string({ required_error: "Password is required!" })
    .min(1, "Invalid password!")
    .max(40),
});

export const registerBodySchema = z
  .object({
    username: z
      .string()
      .min(3, "Please enter a username with at least three characters.")
      .max(255, "Username is too long!")
      .regex(usernameRegex, { message: "Invalid username." }),
    email: z.string().email("Invalid email, try again!"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters!")
      .max(40, "Password is too long!")
      .regex(
        passwordRegex,
        "Password must contain at least one uppercase and one lowercase letter!"
      ),
    confirm_password: z.string().max(40),
  })
  .refine(({ password, confirm_password }) => password === confirm_password, {
    message: "Passwords don't match!",
    path: ["confirm_password"],
  });

export type SigninType = z.infer<typeof signinBodySchema>;
export type RegisterType = z.infer<typeof registerBodySchema>;
