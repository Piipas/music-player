import { NextFunction, Request, Response } from "express";
import { AnyZodObject, z } from "zod";

export const validate =
    (schema: z.ZodEffects<z.AnyZodObject> | AnyZodObject) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });

            return next();
        } catch (error) {
            return res.status(400).json(error);
        }
    };
