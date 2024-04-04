import { createContext, useContext, useEffect, useState } from "react";
import { ProvidersProps } from ".";
import { Song } from "@/types";
import useSong from "@/hooks/useSong";

interface MusicContextType {
  currentSong: Song | null | undefined;
  isPlaying: boolean;
  audio: HTMLAudioElement;
  queue: Song[];
  currentTime: number;
  playSong: (song: Song) => void;
  play: () => void;
  pause: () => void;
  loop: (loop: boolean) => void;
}

const defaultValue = {
  currentSong: null,
  isPlaying: false,
  audio: document.createElement("audio"),
  queue: [],
  currentTime: 0,
  playSong: () => null,
  play: () => null,
  pause: () => null,
  loop: () => null,
};

const MusicContext = createContext<MusicContextType>(defaultValue);

export const MusicProvider = ({ children }: ProvidersProps) => {
  const [currentSong, setCurrentSong] = useState<Song | null>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [queue, setQueue] = useState<Song[]>([]);

  const { audio } = useSong(currentSong ? currentSong.id : Number(localStorage.getItem("current-song")));

  useEffect(() => {
    if (audio) {
      audio.addEventListener("timeupdate", () => setCurrentTime(audio.currentTime));
      audio.addEventListener("ended", () => setIsPlaying(false));
      audio.addEventListener("pause", () => pause());
      audio.addEventListener("play", () => play());
    }
  }, [audio]);

  const play = async () => {
    audio?.play();
    setIsPlaying(true);
  };

  const pause = async () => {
    audio?.pause();
    setIsPlaying(false);
  };

  const playSong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setIsLooping(false);
  };

  const loop = (loop: boolean) => {
    audio.loop = loop;
    setIsLooping(loop);
  };

  // const next = () => {
  //   pause();
  // };

  return (
    <MusicContext.Provider value={{ currentSong, isPlaying, audio, queue, currentTime, play, playSong, pause, loop }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);
