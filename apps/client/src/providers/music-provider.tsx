import { createContext, useContext, useState } from "react";
import { Prisma } from "mp-prisma";
import { ProvidersProps } from ".";

interface MusicContextType {
  currentSong: Prisma.SongGetPayload<{ include: { Artist: true } }> | null | undefined;
  isPlaying: boolean;
  playSong: (song: Prisma.SongGetPayload<{ include: { Artist: true } }>) => void;
  play: (audio: HTMLAudioElement) => void;
  pause: (audio: HTMLAudioElement) => void;
}

const defaultValue = {
  currentSong: null,
  isPlaying: false,
  audio: null,
  playSong: () => {},
  play: () => {},
  pause: () => {},
};

const MusicContext = createContext<MusicContextType>(defaultValue);

export const MusicProvider = ({ children }: ProvidersProps) => {
  const [currentSong, setCurrentSong] = useState<Prisma.SongGetPayload<{ include: { Artist: true } }> | null>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const play = (audio: HTMLAudioElement) => {
    audio.play();
    setIsPlaying(true);
  };

  const pause = (audio: HTMLAudioElement) => {
    audio.pause();
    setIsPlaying(false);
  };

  const playSong = async (song: Prisma.SongGetPayload<{ include: { Artist: true } }>) => {
    setCurrentSong(song);
  };

  return (
    <MusicContext.Provider value={{ currentSong, isPlaying, play, playSong, pause }}>{children}</MusicContext.Provider>
  );
};

export const useMusic = (): MusicContextType => useContext(MusicContext);
