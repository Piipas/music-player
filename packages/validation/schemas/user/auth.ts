import { z } from "zod";

const usernameRegex = new RegExp(/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/gi);
const passwordRegex = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z]).*$/);

export const signinBodySchema = z.object({
    username: z
        .string({ required_error: "Username is required!" })
        .regex(usernameRegex, { message: "Invalid username" })
        .max(255),
    password: z.string({ required_error: "Password is required!" }).max(40),
});

export const registerBodySchema = z
    .object({
        username: z
            .string()
            .min(3)
            .max(255)
            .regex(usernameRegex, { message: "Invalid username" }),
        email: z.string().email(),
        password: z.string().regex(passwordRegex).min(8).max(40),
        confirm_password: z.string().regex(passwordRegex).min(8).max(40),
    })
    .refine(({ password, confirm_password }) => password === confirm_password, {
        message: "Passwords do not match!",
        path: ["confirm_password"],
    });

export type SigninType = z.infer<typeof signinBodySchema>;
export type RegisterType = z.infer<typeof registerBodySchema>;
