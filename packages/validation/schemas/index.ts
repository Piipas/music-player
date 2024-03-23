import { z } from "zod";
import { registerBodySchema, signinBodySchema } from "./user/auth";
import { item_id, paginationQueryParamsSchema } from "./global";

// Auth Schemas

export const signinRequestSchema = z.object({
    body: signinBodySchema,
});

export const registerRequestSchema = z.object({
    body: registerBodySchema,
});

// Artist Schemas

export const getArtistRequestSchema = z.object({
    query: item_id("artist_id"),
});

export const getArtistsRequestSchema = z.object({
    query: paginationQueryParamsSchema,
});

export const followArtistRequestSchema = z.object({
    query: item_id("artist_id"),
});

export const unfollowArtistRequestSchema = z.object({
    query: item_id("artist_id"),
});

// Song Schemas

export const getSongRequestSchema = z.object({
    query: item_id("song_id"),
});

export const getPlaylistSongsRequestSchema = z.object({
    query: paginationQueryParamsSchema,
    params: item_id("playlist_id"),
});

export const getArtistSongsRequestSchema = z.object({
    query: paginationQueryParamsSchema,
    params: item_id("artist_id"),
});

export const likeSongRequestSchema = z.object({
    query: item_id("song_id"),
});

export const unlikeSongRequestSchema = z.object({
    query: item_id("song_id"),
});

// Playlist Schemas

export const getPlaylistRequestSchema = z.object({
    query: item_id("playlist_id"),
});

export const likePlaylistRequestSchema = z.object({
    query: item_id("playlist_id"),
});

export const unlikePlaylistRequestSchema = z.object({
    query: item_id("playlist_id"),
});
