import { Button } from "@/components/atoms/button";
import { BadgeCheck, Heart } from "lucide-react";
import wallpaper from "@/assets/eminem-wallpaper.jpg";
import SongsTable from "@/components/organisms/songs-table";
import useSongs from "@/hooks/useSongs";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { artistApi } from "@/lib/api/artist-api";
import { queryClient } from "@/providers";
import { Artist as A } from "@/types";

function Artist() {
  const { id } = useParams();
  const { data: songs, isLoading } = useSongs({
    sourceId: Number(id),
    songsSource: "artist",
    cursor: "0",
    limit: "10",
  });

  const { data: artist, isPending } = useQuery({
    queryKey: ["artist", id],
    queryFn: () => artistApi.getArtist(Number(id)),
  });

  const { mutate: followMutate } = useMutation({
    mutationFn: () => artistApi.followArtist(Number(id)),
    onSuccess: (following) =>
      queryClient.setQueryData(["artist", id], (data: A): A => ({ ...data, Follows: following })),
  });

  const { mutate: unfollowMutate } = useMutation({
    mutationFn: () => artistApi.unfollowArtist(Number(id)),
    onSuccess: () => queryClient.setQueryData(["artist", id], (data: A): A => ({ ...data, Follows: [] })),
  });

  const handleFollow = (follow: boolean) => {
    follow ? followMutate() : unfollowMutate();
  };

  return (
    isLoading ||
    isPending || (
      <>
        <div className="w-full rounded-2xl border-2 border-white h-48 p-6 flex items-center relative overflow-hidden">
          <img src={wallpaper} className="w-full absolute top-0 left-0 opacity-30" alt="" />
          <div className="z-10">
            {/* <div className="text-sm">Artist</div> */}
            <div className="text-lg flex gap-2 items-center">
              Verified Artist <BadgeCheck className="fill-main" size={20} />
            </div>
            <div className="text-5xl font-semibold">{artist?.name}</div>
            <Button
              size={"sm"}
              variant={artist?.Follows.length ? "default" : "main"}
              className="mt-2 text-lg font-semibold gap-2"
              onClick={() => handleFollow(!artist?.Follows.length)}
            >
              {artist?.Follows.length ? (
                <>
                  <Heart size={18} className="text-main" />
                  Following
                </>
              ) : (
                <>
                  <Heart size={18} />
                  Follow
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

export default Artist;
