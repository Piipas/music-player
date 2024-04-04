import { z } from "zod";

export const newSongBodySchema = z.object({
    // audio: z
    //     .custom<File>((file) => {
    //         return file instanceof File;
    //     }, "Song audio is required!")
    //     .refine((file) => file.type.startsWith("audio/"), {
    //         message: "Only audio file are allowed!",
    //     })
    //     .refine((file) => file.size <= 1e7, {
    //         message: "File size cannot be more than 10MB!",
    //     }),
    // image: z
    //     .custom<File>((file) => file instanceof File, "Song image is required!")
    //     .refine((file) => file.type.startsWith("audio/"), {
    //         message: "Only audio file are allowed!",
    //     })
    //     .refine((file) => file.size <= 1e7, {
    //         message: "File size cannot be more than 10MB!",
    //     }),
    audio: z.any(),
    image: z.any(),
    name: z.string().min(1).max(255),
});

export type NewSongType = z.infer<typeof newSongBodySchema>;
