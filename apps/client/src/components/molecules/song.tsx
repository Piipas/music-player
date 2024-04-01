import { Heart, Play } from "lucide-react";
import { TableCell, TableRow } from "@/components/atoms/table";
import { milliToTime } from "@/lib/utils";
import { Button } from "@/components/atoms/button";
import { useNavigate } from "react-router-dom";
import { Prisma } from "mp-prisma";
import { useMusic } from "@/providers/music-provider";

interface SongProps {
  song: Prisma.SongGetPayload<{ include: { Artist: true; Likes: true } }>;
}

function Song({ song }: SongProps) {
  const { playSong } = useMusic();
  const navigate = useNavigate();

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
        <Button variant={"ghost"}>
          <Heart className={song.Likes.length ? "fill-main stroke-main" : ""} size={18} />
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default Song;
