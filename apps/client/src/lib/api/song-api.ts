import axios from "@/lib/axios";
import { PaginationType } from "mp-validation";

export const songApi = {
  getSong: async (song_id: number) => {
    const song = await axios.get(`songs/${song_id}`);
    return song.data;
  },

  streamSong: async (song_id: number) => {
    const song = await axios.get(`songs/${song_id}/stream`, { responseType: "stream" });
    return song.data;
  },

  getPlaylistSongs: async (params: PaginationType, playlist_id: number) => {
    const queryParams = new URLSearchParams();
    for (const param in params) if (params[param]) queryParams.append(param, String(params[param]));
    const songs = await axios.get(`songs/playlist/${playlist_id}?${queryParams.toString()}`);
    return songs.data;
  },

  getArtistSong: async (params: PaginationType, artist_id: number) => {
    const queryParams = new URLSearchParams();
    for (const param in params) if (params[param]) queryParams.append(param, String(params[param]));
    const songs = await axios.get(`songs/playlist/${artist_id}?${queryParams.toString()}`);
    return songs.data;
  },

  likeSong: async (song_id: number) => {
    const like = await axios.post(`songs/${song_id}/like`);
    return like.data;
  },

  unlikeSong: async (song_id: number) => {
    const unlike = await axios.post(`songs/${song_id}/unlike`);
    return unlike.data;
  },
};
