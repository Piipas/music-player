import { Button } from "@/components/atoms/button";
import SongsTable from "@/components/organisms/songs-table";
import { Heart } from "lucide-react";
import wallpaper from "@/assets/eminem-wallpaper.jpg";

const playlist = {
  name: "Happy New Year",
  likes: 24732,
  songs: [
    {
      name: "Bad Guy",
      image: "https://github.com/shadcn.png",
      duration: "02:45",
      artist: "Billie Eilish",
      isLiked: true,
    },
    {
      name: "Ocean",
      image: "https://github.com/shadcn.png",
      duration: "02:45",
      artist: "Billie Eilish",
      isLiked: true,
    },
    {
      name: "Bad Guy",
      image: "https://github.com/shadcn.png",
      duration: "02:45",
      artist: "Billie Eilish",
      isLiked: true,
    },
    {
      name: "Bad Guy",
      image: "https://github.com/shadcn.png",
      duration: "02:45",
      artist: "Billie Eilish",
      isLiked: false,
    },
    {
      name: "Bad Guy",
      image: "https://github.com/shadcn.png",
      duration: "02:45",
      artist: "Billie Eilish",
      isLiked: true,
    },
    {
      name: "Bad Guy",
      image: "https://github.com/shadcn.png",
      duration: "02:45",
      artist: "Billie Eilish",
      isLiked: false,
    },
    {
      name: "Bad Guy",
      image: "https://github.com/shadcn.png",
      duration: "02:45",
      artist: "Billie Eilish",
      isLiked: true,
    },
    {
      name: "Bad Guy",
      image: "https://github.com/shadcn.png",
      duration: "02:45",
      artist: "Billie Eilish",
      isLiked: true,
    },
  ],
};

function Playlist() {
  return (
    <>
      <div className="w-full rounded-2xl border-2 border-white h-48 p-6 flex items-center relative overflow-hidden">
        <img src={wallpaper} className="w-full absolute top-0 left-0 opacity-30" alt="" />
        <div className="z-10">
          {/* <div className="text-sm">Artist</div> */}
          <div className="text-5xl font-semibold">{playlist.name}</div>
          <div className="text-lg flex gap-2 items-center">by Pipas</div>
          <Button size={"sm"} variant={"main"} className="mt-2 text-lg font-semibold gap-2">
            <Heart size={18} />
            Follow
          </Button>
        </div>
      </div>
      <div className="w-full pt-4">
        <div className="text-4xl font-semibold">Songs</div>
        <SongsTable songs={playlist.songs} />
      </div>
    </>
  );
}

export default Playlist;
