import { Heart, HistoryIcon } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { useQuery } from "@tanstack/react-query";
import { songApi } from "@/lib/api/song-api";
import { Prisma } from "mp-prisma";
import { IKImage } from "imagekitio-react";

type HistorySongType = {
  Song: Prisma.SongGetPayload<{ include: { Artist: true; Likes: true } }>;
};

function History() {
  const { data: history, isLoading, isSuccess } = useQuery({ queryKey: ["history"], queryFn: songApi.getHistory });

  return (
    isSuccess && (
      <div className="h-full col-span-3 bg-slate-800 rounded-xl p-4">
        <div className="text-lg flex gap-4 font-semibold pb-2 border-b border-gray-700 text-white">
          <HistoryIcon /> Recently played
        </div>
        <ul className="px-2 py-3 flex gap-y-3 flex-wrap">
          {isLoading ||
            history.map(({ Song: { id, name, image, Artist, Likes } }: HistorySongType) => (
              <li className="flex gap-4 items-center w-full pe-2" key={id}>
                <div className="w-12 h-12 overflow-hidden rounded-md">
                  <IKImage path={image} alt={`${name} avatar`} />
                </div>
                <div className="-space-y-1 flex-grow">
                  <div className="font-semibold text-sm">{name}</div>
                  <div className="text-sm opacity-50">{Artist.name}</div>
                </div>
                <Button variant={"ghost"} className="justify-self-end cursor-default">
                  <Heart className={Likes.length ? "fill-main stroke-main" : ""} size={18} />
                </Button>
              </li>
            ))}
        </ul>
      </div>
    )
  );
}

export default History;
