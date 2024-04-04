import { Button } from "@/components/atoms/button";
import wallpaper from "@/assets/eminem-wallpaper.jpg";
import { BadgeCheck, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { artistApi } from "@/lib/api/artist-api";
import { IKImage } from "imagekitio-react";

const Home = () => {
  const navigate = useNavigate();

  const { data: artists, isLoading } = useQuery({
    queryKey: ["artists"],
    queryFn: () => artistApi.getArtists({ limit: "6", cursor: "0" }),
  });

  return (
    isLoading || (
      <>
        <div className="w-full rounded-2xl border-2 border-white h-48 p-6 flex items-center relative overflow-hidden">
          <img src={wallpaper} className="w-full absolute top-0 left-0 opacity-30" alt="" />
          <div className="z-10">
            {/* <div className="text-sm">Artist</div> */}
            <div className="text-5xl font-semibold">Stakatak Sbakatak</div>
            <div className="text-lg flex gap-2 items-center">
              Artist, Cheb Laarbi <BadgeCheck className="fill-main" size={20} />
            </div>
            <Button size={"sm"} variant={"main"} className="w-24 mt-2 text-lg font-semibold gap-2">
              <Play size={18} />
              Play
            </Button>
          </div>
        </div>
        <div className="w-full pt-4">
          <div className="text-4xl font-semibold">Artists</div>
          <div className="grid grid-cols-12 gap-4 pt-4">
            {artists?.map(({ avatar, name, id }) => (
              <div
                className="w-full cursor-pointer col-span-2 p-2 rounded-lg hover:bg-slate-900 transition-colors"
                onClick={() => navigate(`/artist/${id}`)}
                key={id}
              >
                {/* <img src={`http://localhost:4001/data/artists/avatars/${avatar}`} className="rounded-lg" alt="" /> */}
                <IKImage path={avatar} className="rounded-lg" width={200} height={200} />
                <div className="text-base pt-2 px-1 font-semibold opacity-70">{name}</div>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  );
};

export default Home;
