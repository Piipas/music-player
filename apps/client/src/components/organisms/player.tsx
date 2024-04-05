import { Pause, Play, SkipBack, SkipForward, Volume1, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { Slider } from "@/components/atoms/slider";
import { useMusic } from "@/providers/music-provider";
import { useState } from "react";
import { IKImage } from "imagekitio-react";

function Player() {
  const { currentSong, isPlaying, currentTime, play, pause, audio, next, previous } = useMusic();
  const [volume, setVolume] = useState<number>(audio ? audio.volume * 100 : 50);

  const handleVolume = (value: number) => {
    audio.volume = value / 100;
    setVolume(value);
  };

  const handleTime = (value: number) => {
    audio.currentTime = value;
  };

  const handlePlay = () => {
    isPlaying ? pause() : play();
  };

  return (
    <div className="h-20 border-t border-gray-600 w-full py-2 px-4 grid grid-cols-12 relative z-50 bg-background">
      <div className="absolute top-0 left-0 -translate-y-1/2 w-full">
        <Slider
          defaultValue={[0]}
          max={Math.floor(audio.duration)}
          onValueChange={(value) => handleTime(value[0])}
          value={[currentTime]}
          step={1}
          className="w-full"
        />
      </div>
      <div className="h-ful flex items-center col-span-4">
        <div className="w-16 rounded-md overflow-hidden">
          <IKImage path={currentSong ? currentSong.image : "https://github.com/shadcn.png"} />
        </div>
        <div className="ps-2 -space-y-1">
          <div className="text-lg font-semibold capitalize">{currentSong ? currentSong.name : "Rap God"}</div>
          <div className="text-sm opacity-50 capitalize">{currentSong ? currentSong.Artist.name : "Eminem"}</div>
        </div>
      </div>
      <div className="flex gap-3 items-center col-span-4 justify-center">
        <Button size={"icon"} variant={"ghost"} className="rounded-full" onClick={previous}>
          <SkipBack />
        </Button>
        <Button size={"icon"} className="rounded-full" onClick={handlePlay}>
          {isPlaying ? <Pause /> : <Play />}
        </Button>
        <Button size={"icon"} variant={"ghost"} className="rounded-full" onClick={next}>
          <SkipForward />
        </Button>
      </div>
      <div className="flex gap-3 col-span-4 justify-end">
        <div className="w-40 flex h-full items-center gap-3">
          {volume <= 0 && <VolumeX />}
          {volume > 0 && volume <= 30 && <Volume1 />}
          {volume > 30 && <Volume2 />}
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
