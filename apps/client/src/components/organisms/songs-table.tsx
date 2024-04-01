import { Table, TableHeader, TableRow, TableHead, TableBody } from "@/components/atoms/table";
import { Clock } from "lucide-react";
import { Prisma } from "mp-prisma";
import Song from "@/components/molecules/song";

function SongsTable({ songs }: { songs: Prisma.SongGetPayload<{ include: { Artist: true; Likes: true } }>[] }) {
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
            <Song song={song} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default SongsTable;
