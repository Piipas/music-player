import { z } from "zod";
import { registerBodySchema, signinBodySchema } from "./user/auth";

export const signinRequestSchema = z.object({
    body: signinBodySchema,
});

export const registerRequestSchema = z.object({
    body: registerBodySchema,
});
