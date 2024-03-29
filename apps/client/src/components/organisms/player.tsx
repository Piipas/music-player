import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { Slider } from "@/components/atoms/slider";
import { useMusic } from "@/providers/music-provider";

function Player() {
  const { currentSong, isPlaying, play, pause } = useMusic();

  return (
    <div className="h-20 border-t border-gray-600 w-full py-2 px-4 flex justify-between relative z-50 bg-background">
      <div className="absolute top-0 left-0 -translate-y-1/2 w-full">
        <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
      </div>
      <div className="h-ful flex items-center">
        <div className="w-16 rounded-md overflow-hidden">
          <img src="https://github.com/shadcn.png" alt="artist" />
        </div>
        <div className="ps-2 -space-y-1">
          <div className="text-lg font-semibold">{currentSong ? currentSong.name : "Rap God"}</div>
          <div className="text-sm opacity-50">{currentSong ? currentSong.Artist.name : "Eminem"}</div>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <Button size={"icon"} variant={"ghost"} className="rounded-full">
          <SkipBack />
        </Button>
        <Button size={"icon"} className="rounded-full" onClick={isPlaying ? () => play : () => pause}>
          {isPlaying ? <Pause /> : <Play />}
        </Button>
        <Button size={"icon"} variant={"ghost"} className="rounded-full">
          <SkipForward />
        </Button>
      </div>
      <div className="h-full flex items-center w-40 gap-3">
        <Volume2 />
        <Slider defaultValue={[50]} max={100} step={1} />
      </div>
    </div>
  );
}

export default Player;
