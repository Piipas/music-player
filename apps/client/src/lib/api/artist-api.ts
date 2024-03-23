import axios from "@/lib/axios";

export const artistApi = {
  getArtist: async (artist_id: number) => {
    const artist = await axios.get(`artists/${artist_id}`);
    return artist.data;
  },

  getArtists: async (params: { limit: number; cursor: number; [key: string]: any }) => {
    const queryParams = new URLSearchParams();
    for (const param in params) if (params[param]) queryParams.append(param, String(params[param]));
    const artists = await axios.get(`artists?${queryParams.toString()}`);
    return artists.data;
  },

  followArtist: async (artist_id: number) => {
    const follow = await axios.post(`artists/${artist_id}/follow`);
    return follow.data;
  },

  unfollowArtist: async (artist_id: number) => {
    const unfollow = await axios.post(`artists/${artist_id}/unfollow`);
    return unfollow.data;
  },
};
