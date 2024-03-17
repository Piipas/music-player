import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/atoms/table";
import { Clock, Heart } from "lucide-react";
import { Button } from "../atoms/button";
import { useNavigate } from "react-router-dom";

export interface SongsTableType {
  name: string;
  image: string;
  duration: string;
  artist: string;
  isLiked: boolean;
}

function SongsTable({ songs }: { songs: SongsTableType[] }) {
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
          {songs.map(({ name, image, duration, artist, isLiked }) => (
            <TableRow>
              <TableCell className="font-medium flex gap-2 items-center">
                <img src={image} className="w-10 h-10 rounded-md" alt="" /> {name}
              </TableCell>
              <TableCell>
                <Button variant={"link"} onClick={() => navigate(`/artist/${artist}`)}>
                  {artist}
                </Button>
              </TableCell>
              <TableCell>{duration}</TableCell>
              <TableCell>
                <Button variant={"ghost"}>
                  <Heart className={isLiked ? "fill-main stroke-main" : ""} size={18} />
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
