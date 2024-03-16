import { NavLink } from "react-router-dom";
import { AlignJustify, Disc, Library, ListMusic, MicVocal, Star, Telescope } from "lucide-react";

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
  return (
    <div className="col-span-2 border-e border-gray-800 px-6 flex flex-col justify-between h-full">
      <div className="">
        <div className="logo text-center text-2xl font-semibold text-main py-6 capitalize">Music Player</div>
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
        <div className="text-lg flex gap-4 font-semibold pb-1 border-b border-gray-700 text-main">
          <Library /> My Library
        </div>
        <ul className="space-y-2 pt-2 ps-2">
          <li className="flex gap-3">
            <AlignJustify />
            <span>Happy New Year</span>
          </li>
          <li className="flex gap-3">
            <AlignJustify />
            <span>Car Beats 2023</span>
          </li>
          <li className="flex gap-3">
            <AlignJustify />
            <span>raaaaaaaave</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default LeftSidebar;
