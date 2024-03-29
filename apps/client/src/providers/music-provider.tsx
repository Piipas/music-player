import { createContext, useContext, useState } from "react";
import { Artist, Prisma, Song } from "mp-prisma";
import { ProvidersProps } from ".";
import useSong from "@/hooks/useSong";

type MusicContextType = {
  currentSong: Prisma.SongGetPayload<{ include: { Artist: true } }> | null | undefined;
  isPlaying: boolean;
  play: () => void;
  playSong: (song: Prisma.SongGetPayload<{ include: { Artist: true } }>) => void;
  pause: () => void;
} | null;

const MusicContext = createContext<MusicContextType>(null);

export const MusicProvider = ({ children }: ProvidersProps) => {
  const [currentSong, setCurrentSong] = useState<Prisma.SongGetPayload<{ include: { Artist: true } }> | null>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const play = () => {
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const playSong = async (song: Prisma.SongGetPayload<{ include: { Artist: true } }>) => {
    const { audio, isLoading, audioRef } = useSong(song.id);
    if (!isLoading) setCurrentSong(song), setIsPlaying(true);
  };

  return (
    <MusicContext.Provider value={{ currentSong, isPlaying, play, playSong, pause }}>{children}</MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);
