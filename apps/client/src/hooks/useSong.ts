import { songApi } from "@/lib/api/song-api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

const useSong = (song_id: number) => {
  const audioRef = useRef<HTMLAudioElement>(document.createElement("audio"));
  const { data, isLoading, isError } = useQuery({
    queryKey: ["current_song", song_id],
    queryFn: () => songApi.streamSong(song_id),
  });

  useEffect(() => {
    const audioElement = audioRef.current;

    if (!isLoading && !isError && data) {
      audioElement.src = "";
      audioElement.currentTime = 0;
      const blob = new Blob([data], { type: "audio/mp3" });
      const blobUrl = URL.createObjectURL(blob);

      audioElement.src = blobUrl;
      audioElement.volume = Number(localStorage.getItem("volume")) / 100 || 0.025;
      audioElement.currentTime = 0;
      audioElement.setAttribute("controls", "false");
      audioElement.autoplay = true;

      localStorage.setItem("current-song", String(song_id));
    }
  }, [song_id, isLoading]);

  return { isLoading, audio: audioRef.current };
};

export default useSong;
