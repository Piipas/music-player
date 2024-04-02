import { songApi } from "@/lib/api/song-api";
import { useQuery } from "@tanstack/react-query";
import { PaginationType } from "mp-validation";

type SongsProps = {
  songsSource: "artist" | "playlist";
  sourceId: number;
} & PaginationType;

const useSongs = ({ songsSource, sourceId, cursor, limit }: SongsProps) => {
  let songsRequest = null;

  switch (songsSource) {
    case "artist":
      songsRequest = songApi.getArtistSong;
      break;
    case "playlist":
      songsRequest = songApi.getPlaylistSongs;
      break;
  }

  const { data, isLoading } = useQuery({
    queryKey: [`${songsSource}_songs`, sourceId],
    queryFn: () => songsRequest({ limit, cursor }, sourceId),
  });

  return { data, isLoading };
};

export default useSongs;
