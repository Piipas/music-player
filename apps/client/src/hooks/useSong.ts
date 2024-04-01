import { songApi } from "@/lib/api/song-api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

const useSong = (song_id: number) => {
  const [audio, setAudio] = useState<HTMLAudioElement>(document.createElement("audio"));
  const { data, isLoading, isError } = useQuery({
    queryKey: ["current_song", song_id],
    queryFn: () => songApi.streamSong(song_id),
  });

  let audioRef = useRef<HTMLAudioElement>(audio);

  useEffect(() => {
    if (!isLoading && !isError && data) {
      const blob = new Blob([data], { type: "audio/mp3" });
      const blobUrl = URL.createObjectURL(blob);

      const audioElement = new Audio(blobUrl);
      audioElement.volume = Number(localStorage.getItem("volume")) / 100 || 0.025;
      audioElement.setAttribute("controls", "false");

      setAudio(audioElement);
      audioRef.current = audioElement;

      localStorage.setItem("current-song", String(song_id));
    }
  }, [isLoading, isError, data]);

  return { audio, isLoading, audioRef };
};

export default useSong;
