import { Heart, Play } from "lucide-react";
import { TableCell, TableRow } from "@/components/atoms/table";
import { milliToTime } from "@/lib/utils";
import { Button } from "@/components/atoms/button";
import { useNavigate } from "react-router-dom";
import { useMusic } from "@/providers/music-provider";
import { useMutation } from "@tanstack/react-query";
import { songApi } from "@/lib/api/song-api";
import { queryClient } from "@/providers";
import { History, Song as S } from "@/types";
import { SongsLikes } from "mp-prisma";

interface SongProps {
  song: S;
}

function Song({ song }: SongProps) {
  const { playSong } = useMusic();
  const navigate = useNavigate();

  const { mutateAsync: likeMutate } = useMutation({
    mutationFn: async () => await songApi.likeSong(song.id),
    onSuccess: (data: SongsLikes) => {
      song.Likes.push(data);
      queryClient.setQueryData(["history"], (history: History) =>
        history.map((historySong) => {
          if (historySong.song_id === song.id) return { ...historySong, Song: { ...historySong.Song, Likes: [data] } };
          return historySong;
        }),
      );
    },
    onError: (error) => console.log(error),
  });

  const { mutateAsync: unlikeMutate } = useMutation({
    mutationFn: async () => await songApi.unlikeSong(song.id),
    onSuccess: () => {
      song.Likes = [];
      queryClient.setQueryData(["history"], (history: History) =>
        history.map((historySong) => {
          if (historySong.song_id === song.id) return { ...historySong, Song: { ...historySong.Song, Likes: [] } };
          return historySong;
        }),
      );
    },
    onError: (error) => console.log(error),
  });

  const handleLike = (like: boolean) => (like ? likeMutate() : unlikeMutate());

  return (
    <TableRow>
      <TableCell className="font-medium flex gap-3 items-center capitalize">
        <Button size={"icon"} variant={"ghost"} onClick={() => playSong(song)}>
          <Play className="fill-main stroke-none" />
        </Button>
        <img src={"https://github.com/shadcn.png"} className="w-10 h-10 rounded-md" alt="" /> {song.name}
      </TableCell>
      <TableCell>
        <Button variant={"link"} className="p-0" onClick={() => navigate(`/artist/${song.Artist.id}`)}>
          {song.Artist.name}
        </Button>
      </TableCell>
      <TableCell>{milliToTime(song.duration)}</TableCell>
      <TableCell>
        <Button variant={"ghost"} onClick={() => handleLike(!song.Likes.length)}>
          <Heart className={song.Likes.length ? "fill-main stroke-main" : ""} size={18} />
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default Song;
