import { Button } from "@/components/atoms/button";
import SongsTable from "@/components/organisms/songs-table";
import { Heart } from "lucide-react";
import useSongs from "@/hooks/useSongs";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/providers";
import { playlistApi } from "@/lib/api/playlist-api";
import { Playlist as P } from "@/types";

function Playlist() {
  const { id } = useParams();
  const { data: songs, isLoading } = useSongs({
    sourceId: Number(id),
    songsSource: "playlist",
    cursor: "0",
    limit: "10",
  });

  const { data: playlist, isPending } = useQuery({
    queryKey: ["playlist", id],
    queryFn: () => playlistApi.getPlaylist(Number(id)),
  });

  const { mutate: likeMutate } = useMutation({
    mutationFn: () => playlistApi.likePlaylist(Number(id)),
    onSuccess: (liking) => queryClient.setQueryData(["playlist", id], (data: P): P => ({ ...data, Likes: liking })),
  });

  const { mutate: unlikeMutate } = useMutation({
    mutationFn: () => playlistApi.unlikePlaylist(Number(id)),
    onSuccess: () => queryClient.setQueryData(["playlist", id], (data: P): P => ({ ...data, Likes: [] })),
  });

  const handleLike = (follow: boolean) => {
    follow ? likeMutate() : unlikeMutate();
  };

  return (
    isLoading ||
    isPending || (
      <>
        <div className="w-full rounded-2xl border-2 border-white h-48 p-6 flex items-center relative overflow-hidden">
          {/* <img src={wallpaper} className="w-full absolute top-0 left-0 opacity-30" alt="" /> */}
          <div className="z-10">
            {/* <div className="text-sm">Artist</div> */}
            {/* <div className="text-5xl font-semibold">{playlist.name}</div> */}
            <div className="text-5xl font-semibold">{playlist?.name}</div>
            <div className="text-lg flex gap-2 items-center">by {playlist?.User.username}</div>
            <Button
              size={"sm"}
              variant={playlist?.Likes.length ? "default" : "main"}
              className="mt-2 text-lg font-semibold gap-2"
              onClick={() => handleLike(!playlist?.Likes.length)}
            >
              {playlist?.Likes.length ? (
                <>
                  <Heart size={18} className="stroke-main" />
                  Liked
                </>
              ) : (
                <>
                  <Heart size={18} />
                  Like
                </>
              )}
            </Button>
          </div>
        </div>
        <div className="w-full pt-4">
          <div className="text-4xl font-semibold">Songs</div>
          <SongsTable songs={songs} />
        </div>
      </>
    )
  );
}

export default Playlist;
