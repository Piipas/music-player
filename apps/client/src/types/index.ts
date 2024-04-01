import { Prisma } from "mp-prisma";

export type History = Prisma.HistoryGetPayload<{ include: { Song: { include: { Artist: true; Likes: true } } } }>[];

export type Song = Prisma.SongGetPayload<{ include: { Artist: true; Likes: true } }>;
