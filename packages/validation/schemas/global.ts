import { z } from "zod";

export const numberRegex = new RegExp(/[0-9]*/);

export const paginationQueryParamsSchema = z.object({
    limit: z.string().regex(numberRegex),
    cursor: z.string().regex(numberRegex),
    query: z.string().min(1).max(255).optional(),
});

export const item_id = (...items_ids: string[]) => {
    const items_ids_object = {};
    items_ids.forEach((item_id) => ({
        [item_id]: z.string().regex(numberRegex),
    }));
    return z.object(items_ids_object);
};

export type PaginationType = z.infer<typeof paginationQueryParamsSchema>;
