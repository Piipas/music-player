import axios from "@/lib/axios";
import { Playlist } from "@/types";

export const playlistApi = {
  getPlaylist: async (playlist_id: number): Promise<Playlist> => {
    const playlist = await axios.get(`playlists/${playlist_id}`);
    return playlist.data;
  },

  likePlaylist: async (playlist_id: number) => {
    const like = await axios.post(`playlists/${playlist_id}/like`);
    return like.data;
  },

  unlikePlaylist: async (playlist_id: number) => {
    const unlike = await axios.delete(`playlists/${playlist_id}/unlike`);
    return unlike.data;
  },
};
