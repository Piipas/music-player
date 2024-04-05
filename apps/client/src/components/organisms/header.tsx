import { Avatar, AvatarImage, AvatarFallback } from "@/components/atoms/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu";
import { LogOut, MicVocal, Plus } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth-api";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/atoms/button";
import { Dialog, DialogTrigger } from "../atoms/dialog";
import UploadSong from "./upload-song";
import SwitchArtist from "./switch-artist";

function Header() {
  const navigate = useNavigate();
  // const [query, setQuery] = useState<string>("");
  // const [debouncedInputValue, setDebouncedInputValue] = useState("");

  const { mutate: logoutMutate } = useMutation({ mutationFn: authApi.logout, onSuccess: () => navigate("/login") });

  const { data: me, isLoading } = useQuery({ queryKey: ["me"], queryFn: () => authApi.me() });
  // const { data: artists } = useQuery({
  //   queryKey: ["artists_search", debouncedInputValue],
  //   queryFn: () => artistApi.getArtists({ limit: "6", cursor: "0", query: debouncedInputValue }),
  // });

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    logoutMutate();
  };

  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setQuery(e.target.value);
  // };

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setDebouncedInputValue(query);
  //   }, 500);
  //   return () => clearTimeout(timeout);
  // }, [query, 500]);

  return (
    <div className="header h-16 border-b border-gray-600 flex justify-between items-center px-4">
      <div className="w-80">
        {/* <Input placeholder="Who's your favourite artist?" onChange={handleSearch} />
        <div className="w-full pt-2"></div> */}
      </div>
      {!isLoading && (
        <div className="flex items-center gap-6">
          <div className="flex gap-4">
            {me.Artist ? (
              <Dialog>
                <DialogTrigger>
                  <Button variant={"main"} size={"sm"} className="gap-2">
                    <Plus size={18} /> New Song
                  </Button>
                </DialogTrigger>
                <UploadSong />
              </Dialog>
            ) : (
              <Dialog>
                <DialogTrigger>
                  <Button variant={"outline"} size={"sm"} className="gap-2">
                    <MicVocal size={18} /> Be Artist
                  </Button>
                </DialogTrigger>
                <SwitchArtist />
              </Dialog>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>MP</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Hello {me.username}!</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}

export default Header;
