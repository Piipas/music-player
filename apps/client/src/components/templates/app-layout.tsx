import LeftSidebar from "@/components/organisms/left-sidebar";
import Header from "@/components/organisms/header";
import { Outlet } from "react-router-dom";
import Player from "@/components/organisms/player";
import History from "@/components/organisms/history";

const AppLayout = () => {
  return (
    <div className="grid grid-cols-12 h-screen">
      <LeftSidebar />
      <div className="h-full col-span-10 relative">
        <Header />
        <div className="grid grid-cols-12 gap-4 p-4 h-[calc(100vh-64px-80px)]">
          <div className="container col-span-9 overflow-auto scroll layout-scrollbar">
            <Outlet />
          </div>
          <History />
        </div>
        <Player />
      </div>
    </div>
  );
};

export default AppLayout;
