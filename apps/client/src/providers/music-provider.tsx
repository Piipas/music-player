import { createContext, useContext, useState } from "react";
import { Song } from "mp-prisma";
import { ProvidersProps } from ".";

type MusicContextType = {
  currentSong: Song | null | undefined;
  isPlaying: boolean;
  play: null | ((song: Song) => void);
  pause: null | (() => void);
};

const initialValues: MusicContextType = {
  currentSong: null,
  isPlaying: false,
  play: null,
  pause: null,
};

const MusicContext = createContext<MusicContextType>(initialValues);

export const MusicProvider = ({ children }: ProvidersProps) => {
  const [currentSong, setCurrentSong] = useState<Song | null>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const play = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  return <MusicContext.Provider value={{ currentSong, isPlaying, play, pause }}>{children}</MusicContext.Provider>;
};

export const useMusic = () => useContext(MusicContext);
