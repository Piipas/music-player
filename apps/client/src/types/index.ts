import { Prisma } from "mp-prisma";

export type History = Prisma.HistoryGetPayload<{ include: { Song: { include: { Artist: true; Likes: true } } } }>[];

export type Song = Prisma.SongGetPayload<{ include: { Artist: true; Likes: true } }>;

export type Artist = Prisma.ArtistGetPayload<{ include: { Follows: true } }>;

export type Playlist = Prisma.PlaylistGetPayload<{ include: { Likes: true; User: { select: { username: true } } } }>;

export type User = Prisma.UserGetPayload<{ include: { Artist: true } }>;
