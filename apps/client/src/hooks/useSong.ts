import { songApi } from "@/lib/api/song-api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

const useSong = (song_id: number) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["current_song"],
    queryFn: () => songApi.streamSong(song_id),
  });

  const audioRef = useRef(null);

  useEffect(() => {
    if (!isLoading && !isError && data) {
      const blob = new Blob([data], { type: "audio/mp3" });
      const blobUrl = URL.createObjectURL(blob);

      const audioElement = new Audio(blobUrl);
      setAudio(audioElement);

      audioElement.volume = Number(localStorage.getItem("volume")) / 100 || 0.5;
      audioElement.setAttribute("controls", "false");
    }
  }, [isLoading, isError, data]);

  return { audio, isLoading, audioRef };
};

export default useSong;
