import { RouteObject } from "react-router-dom";
import Home from "@/pages/Home";
import AppLayout from "@/components/templates/app-layout";
import Artist from "@/pages/Artist";
import Playlist from "@/pages/Playlist";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/discover",
        element: <Home />,
      },
      {
        path: "/artist/:username",
        element: <Artist />,
      },
      {
        path: "/playlist/:id",
        element: <Playlist />,
      },
    ],
  },
];

export default routes;
