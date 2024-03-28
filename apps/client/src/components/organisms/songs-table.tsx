import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/atoms/table";
import { Clock, Heart } from "lucide-react";
import { Button } from "../atoms/button";
import { useNavigate } from "react-router-dom";
import { Prisma } from "mp-prisma";
import { milliToTime } from "@/lib/utils";

function SongsTable({ songs }: { songs: Prisma.SongGetPayload<{ include: { Artist: true; Likes: true } }>[] }) {
  const navigate = useNavigate();

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
          {songs.map(({ name, image, duration, Artist, Likes }) => (
            <TableRow>
              <TableCell className="font-medium flex gap-3 items-center capitalize">
                {/* <img src={image} className="w-10 h-10 rounded-md" alt="" /> {name} */}
                <img src={"https://github.com/shadcn.png"} className="w-10 h-10 rounded-md" alt="" /> {name}
              </TableCell>
              <TableCell>
                <Button variant={"link"} className="p-0" onClick={() => navigate(`/artist/${Artist.id}`)}>
                  {Artist.name}
                </Button>
              </TableCell>
              <TableCell>{milliToTime(duration)}</TableCell>
              <TableCell>
                <Button variant={"ghost"}>
                  <Heart className={Likes.length ? "fill-main stroke-main" : ""} size={18} />
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
