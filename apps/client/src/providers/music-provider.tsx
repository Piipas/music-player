import { createContext, useContext, useEffect, useState } from "react";
import { ProvidersProps } from ".";
import { Song } from "@/types";
import useSong from "@/hooks/useSong";

interface MusicContextType {
  currentSong: Song | null | undefined;
  isPlaying: boolean;
  audio: HTMLAudioElement;
  queue: Song[];
  playSong: (song: Song) => void;
  play: () => void;
  pause: () => void;
}

const defaultValue = {
  currentSong: null,
  isPlaying: false,
  audio: document.createElement("audio"),
  queue: [],
  playSong: () => null,
  play: () => null,
  pause: () => null,
};

const MusicContext = createContext<MusicContextType>(defaultValue);

export const MusicProvider = ({ children }: ProvidersProps) => {
  const [currentSong, setCurrentSong] = useState<Song | null>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [queue, setQueue] = useState<Song[]>([]);

  const { isLoading, audio } = useSong(currentSong ? currentSong.id : Number(localStorage.getItem("current-song")));

  const play = async () => {
    audio?.play();
    setIsPlaying(true);
    console.log("play");
  };

  const pause = async () => {
    audio?.pause();
    setIsPlaying(false);
    console.log("pause");
  };

  const playSong = async (song: Song) => {
    // console.log(audio);
    pause();
    setCurrentSong(song);
  };

  // const next = () => {
  //   pause();
  // };

  return (
    <MusicContext.Provider value={{ currentSong, isPlaying, audio, queue, play, playSong, pause }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = (): MusicContextType => useContext(MusicContext);
