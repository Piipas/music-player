import LeftSidebar from "@/components/organisms/left-sidebar";
import Header from "@/components/organisms/header";
import { Outlet } from "react-router-dom";
import Player from "@/components/organisms/player";

const AppLayout = () => {
  return (
    <div className="grid grid-cols-12 h-screen">
      {/* TODO: - header // TODO: - left side-bar // TODO: - right side-bar */}
      <LeftSidebar />
      <div className="h-full col-span-10 relative">
        <Header />
        <Outlet />
        <Player />
      </div>
    </div>
  );
};

export default AppLayout;
