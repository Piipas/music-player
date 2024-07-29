import LeftSidebar from "@/components/organisms/left-sidebar";
import Header from "@/components/organisms/header";
import { Outlet } from "react-router-dom";
import Player from "@/components/organisms/player";
import History from "@/components/organisms/history";
import useAuth from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const AppLayout = () => {
  const { isError, isSuccess } = useAuth();

  return (
    <div className="grid grid-cols-12 h-screen 3xl:container">
      <LeftSidebar />
      <div className="h-full col-span-9 2xl:col-span-10 relative">
        <Header />
        <div className={cn("p-4 h-[calc(100vh-64px-80px)]", isSuccess ? "grid grid-cols-12 gap-6" : "w-full")}>
          <div className="container col-span-9 overflow-auto scroll layout-scrollbar h-full">
            <Outlet />
          </div>
          {isError || <History />}
        </div>
        <Player />
      </div>
    </div>
  );
};

export default AppLayout;
