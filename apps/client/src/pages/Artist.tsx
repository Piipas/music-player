import { Button } from "@/components/atoms/button";
import { BadgeCheck, Heart } from "lucide-react";
import wallpaper from "@/assets/eminem-wallpaper.jpg";
import SongsTable, { SongsTableType } from "@/components/organisms/songs-table";

const artist = {
  name: "Billie Eilish",
};

const songs: SongsTableType[] = [
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
];

function Artist() {
  return (
    <>
      <div className="w-full rounded-2xl border-2 border-white h-48 p-6 flex items-center relative overflow-hidden">
        <img src={wallpaper} className="w-full absolute top-0 left-0 opacity-30" alt="" />
        <div className="z-10">
          {/* <div className="text-sm">Artist</div> */}
          <div className="text-lg flex gap-2 items-center">
            Verified Artist <BadgeCheck className="fill-main" size={20} />
          </div>
          <div className="text-5xl font-semibold">{artist.name}</div>
          <Button size={"sm"} variant={"main"} className="mt-2 text-lg font-semibold gap-2">
            <Heart size={18} />
            Follow
          </Button>
        </div>
      </div>
      <div className="w-full pt-4">
        <div className="text-4xl font-semibold">Songs</div>
        <SongsTable songs={songs} />
      </div>
    </>
  );
}

export default Artist;
