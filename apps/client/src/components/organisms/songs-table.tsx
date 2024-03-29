import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/atoms/table";
import { Clock, Heart, Play } from "lucide-react";
import { Button } from "../atoms/button";
import { useNavigate } from "react-router-dom";
import { Prisma } from "mp-prisma";
import { milliToTime } from "@/lib/utils";
import { useMusic } from "@/providers/music-provider";

function SongsTable({ songs }: { songs: Prisma.SongGetPayload<{ include: { Artist: true; Likes: true } }>[] }) {
  const navigate = useNavigate();
  const { playSong } = useMusic();

  return (
    <div className="w-full pt-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Artist</TableHead>
            <TableHead>
              <Clock />
            </TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {songs.map((song) => (
            <TableRow>
              <TableCell className="font-medium flex gap-3 items-center capitalize">
                {/* <img src={image} className="w-10 h-10 rounded-md" alt="" /> {name} */}
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default SongsTable;
