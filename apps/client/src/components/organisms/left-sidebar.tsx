import { NavLink, useNavigate } from "react-router-dom";
import { AlignJustify, Disc, Library, ListMusic, MicVocal, PlusIcon, Star, Telescope } from "lucide-react";
import { Button } from "@/components/atoms/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/atoms/dialog";

interface NavlinkType {
  label: string;
  to: string;
  icon?: JSX.Element;
}

const navlinks: NavlinkType[] = [
  {
    label: "Discover",
    to: "/discover",
    icon: <Telescope />,
  },
  {
    label: "Albums",
    to: "/albums",
    icon: <Disc />,
  },
  {
    label: "Genres",
    to: "/genres",
    icon: <ListMusic />,
  },
  {
    label: "Artists",
    to: "/artists",
    icon: <MicVocal />,
  },
  {
    label: "Favourites",
    to: "/favourites",
    icon: <Star />,
  },
];

function LeftSidebar() {
  const navigate = useNavigate();
  return (
    <div className="col-span-2 border-e border-gray-800 px-6 flex flex-col justify-between h-full">
      <div className="">
        <div
          className="logo text-center text-2xl font-semibold text-main py-6 capitalize cursor-pointer"
          onClick={() => navigate("/")}
        >
          Spoti Hamid
        </div>
        <ul className="navlinks space-y-3">
          {navlinks.map(({ label, to, icon }) => (
            <li>
              <NavLink to={to} className={"text-lg flex gap-4 group"}>
                {icon}
                {<span className={"group-[.active]:text-main hover:text-main transition-colors"}>{label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="pb-6">
        <div className="flex text-lg font-semibold pb-2 border-b border-gray-700 justify-between items-center">
          <span className="flex gap-4 text-main">
            <Library /> My Library
          </span>
          <span className="">
            <Dialog>
              <DialogTrigger>
                {" "}
                <Button size={"icon-sm"} variant={"main"}>
                  <PlusIcon size={18} />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your account and remove your data from
                    our servers.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </span>
        </div>
        <ul className="space-y-2 pt-2 ps-2">
          <li className="flex gap-3 cursor-pointer group" onClick={() => navigate("/playlist/1")}>
            <AlignJustify />
            <span className="group-hover:text-main transition-colors">Happy New Year</span>
          </li>
          <li className="flex gap-3 cursor-pointer group" onClick={() => navigate("/playlist/2")}>
            <AlignJustify />
            <span className="group-hover:text-main transition-colors">Car Beats 2023</span>
          </li>
          <li className="flex gap-3 cursor-pointer group" onClick={() => navigate("/playlist/3")}>
            <AlignJustify />
            <span className="group-hover:text-main transition-colors">raaaaaaaave</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default LeftSidebar;
