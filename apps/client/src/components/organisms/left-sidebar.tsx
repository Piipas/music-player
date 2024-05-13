import { NavLink, useNavigate } from "react-router-dom";
import { Disc, ListMusic, MicVocal, Star, Telescope } from "lucide-react";

interface NavlinkType {
  label: string;
  to: string;
  icon?: JSX.Element;
}

const navlinks: NavlinkType[] = [
  {
    label: "Discover",
    to: "/",
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
    <div className="col-span-3 2xl:col-span-2 border-e border-gray-800 px-6 flex flex-col justify-between h-full">
      <div className="">
        <div
          className="logo text-center text-2xl font-semibold text-main py-6 capitalize cursor-pointer"
          onClick={() => navigate("/")}
        >
          Pipas Music
        </div>
        <ul className="navlinks space-y-3">
          {navlinks.map(({ label, to, icon }) => (
            <li key={label}>
              <NavLink to={to} className={"text-lg flex gap-4 group"}>
                {icon}
                {<span className={"group-[.active]:text-main hover:text-main transition-colors"}>{label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default LeftSidebar;
