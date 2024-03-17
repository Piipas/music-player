import { Heart, HistoryIcon } from "lucide-react";
import { Button } from "../atoms/button";

const historyTracks = [
  {
    name: "Rap god",
    artist: {
      name: "Eminem",
      avatar: "https://github.com/shadcn.png",
    },
    isLiked: true,
  },
  {
    name: "Rap god",
    artist: {
      name: "Eminem",
      avatar: "https://github.com/shadcn.png",
    },
    isLiked: true,
  },
  {
    name: "Rap god",
    artist: {
      name: "Eminem",
      avatar: "https://github.com/shadcn.png",
    },
    isLiked: false,
  },
];

function History() {
  return (
    <div className="h-full col-span-3 bg-slate-800 rounded-xl p-4">
      <div className="text-lg flex gap-4 font-semibold pb-2 border-b border-gray-700 text-white">
        <HistoryIcon /> Recently played
      </div>
      <ul className="p-3 flex gap-y-3 flex-wrap">
        {historyTracks.map(({ name, artist, isLiked }) => (
          <li className="flex gap-4 items-center w-full pe-2">
            <div className="w-12 h-12 overflow-hidden rounded-md">
              <img src={artist.avatar} alt={`${artist.name} avatar`} />
            </div>
            <div className="-space-y-1 flex-grow">
              <div className="font-semibold text-sm">{name}</div>
              <div className="text-sm opacity-50">{artist.name}</div>
            </div>
            <Button variant={"ghost"} className="justify-self-end">
              <Heart className={isLiked ? "fill-main stroke-main" : ""} size={18} />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;
