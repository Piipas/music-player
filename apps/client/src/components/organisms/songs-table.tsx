import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/atoms/table";
import { Clock } from "lucide-react";
import Song from "@/components/molecules/song";
import { Song as S } from "@/types";

function SongsTable({ songs }: { songs: S[] }) {
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
          {songs.length ? (
            songs.map((song) => <Song song={song} key={song.id} />)
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No songs to show!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default SongsTable;
