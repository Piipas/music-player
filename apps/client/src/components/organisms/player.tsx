import { Pause, Play, SkipBack, SkipForward, Volume, Volume1, Volume2 } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { Slider } from "@/components/atoms/slider";
import { useMusic } from "@/providers/music-provider";
import useSong from "@/hooks/useSong";
import { useState } from "react";

function Player() {
  const { currentSong, isPlaying, play, pause } = useMusic();
  const { audioRef } = useSong(currentSong ? currentSong.id : Number(localStorage.getItem("current-song")));
  const [volume, setVolume] = useState<number>(audioRef.current.volume * 100);

  const handleVolume = (value: number) => {
    audioRef.current.volume = value / 100;
    setVolume(value);
  };

  const handleTime = (value: number) => {
    audioRef.current.currentTime = value;
  };

  return (
    <div className="h-20 border-t border-gray-600 w-full py-2 px-4 grid grid-cols-12 relative z-50 bg-background">
      <div className="absolute top-0 left-0 -translate-y-1/2 w-full">
        <Slider
          defaultValue={[0]}
          max={Math.ceil(audioRef.current.duration)}
          onValueChange={(value) => handleTime(value[0])}
          step={1}
          className="w-full"
        />
      </div>
      <div className="h-ful flex items-center col-span-4">
        <div className="w-16 rounded-md overflow-hidden">
          <img src="https://github.com/shadcn.png" alt="artist" />
        </div>
        <div className="ps-2 -space-y-1">
          <div className="text-lg font-semibold">{currentSong ? currentSong.name : "Rap God"}</div>
          <div className="text-sm opacity-50">{currentSong ? currentSong.Artist.name : "Eminem"}</div>
        </div>
      </div>
      <div className="flex gap-3 items-center col-span-4 justify-center">
        <Button size={"icon"} variant={"ghost"} className="rounded-full">
          <SkipBack />
        </Button>
        <Button
          size={"icon"}
          className="rounded-full"
          onClick={isPlaying ? () => pause(audioRef.current) : () => play(audioRef.current)}
        >
          {isPlaying ? <Pause /> : <Play />}
        </Button>
        <Button size={"icon"} variant={"ghost"} className="rounded-full">
          <SkipForward />
        </Button>
      </div>
      <div className="flex gap-3 col-span-4 justify-end">
        <div className="w-40 flex h-full items-center gap-3">
          {volume > 30 ? <Volume2 /> : <Volume1 />}
          <Slider
            defaultValue={[Number(localStorage.getItem("volume")) || 50]}
            max={100}
            step={1}
            onValueChange={(value) => handleVolume(value[0])}
            onValueCommit={(value) => localStorage.setItem("volume", String(value[0]))}
          />
        </div>
      </div>
    </div>
  );
}

export default Player;
