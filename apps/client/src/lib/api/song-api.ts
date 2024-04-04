import axios from "@/lib/axios";
import { NewSongType, PaginationType } from "mp-validation";

export const songApi = {
  getSong: async (song_id: number) => {
    const song = await axios.get(`songs/${song_id}`);
    return song.data;
  },

  streamSong: async (song_id: number) => {
    const song = await axios.get(`songs/${song_id}/stream`, {
      responseType: "arraybuffer",
      headers: { "Content-Type": "audio/mpeg" },
    });
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
    const { data } = await axios.get(`songs/artist/${artist_id}?${queryParams.toString()}`);
    return data;
  },

  getHistory: async () => {
    const { data } = await axios.get("songs/history");
    return data;
  },

  likeSong: async (song_id: number) => {
    const { data } = await axios.post(`songs/${song_id}/like`);
    return data;
  },

  unlikeSong: async (song_id: number) => {
    const { data } = await axios.delete(`songs/${song_id}/unlike`);
    return data;
  },

  createSong: async (songInfo: FormData) => {
    const { data } = await axios.post("songs/", songInfo);
    return data;
  },
};
