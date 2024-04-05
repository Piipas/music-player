import LeftSidebar from "@/components/organisms/left-sidebar";
import Header from "@/components/organisms/header";
import { Outlet, useNavigate } from "react-router-dom";
import Player from "@/components/organisms/player";
import History from "@/components/organisms/history";
import useAuth from "@/hooks/useAuth";

const AppLayout = () => {
  const navigate = useNavigate();
  const { isError, isSuccess, isLoading } = useAuth();

  if (isError && !isLoading) navigate("/login");

  return (
    isSuccess &&
    !isLoading && (
      <div className="grid grid-cols-12 h-screen 3xl:container">
        <LeftSidebar />
        <div className="h-full col-span-9 2xl:col-span-10 relative">
          <Header />
          <div className="grid grid-cols-12 gap-6 p-4 h-[calc(100vh-64px-80px)]">
            <div className="container col-span-9 overflow-auto scroll layout-scrollbar">
              <Outlet />
            </div>
            <History />
          </div>
          <Player />
        </div>
      </div>
    )
  );
};

export default AppLayout;
