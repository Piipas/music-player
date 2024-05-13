import { RouteObject } from "react-router-dom";
import Home from "@/pages/Home";
import AppLayout from "@/components/templates/app-layout";
import Artist from "@/pages/Artist";
import Playlist from "@/pages/Playlist";
import Signin from "@/pages/Signin";
import Register from "@/pages/Register";
import AuthLayout from "@/components/templates/auth-layout";
import ComingSoon from "@/pages/ComingSoon";

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
        path: "artist/:id",
        element: <Artist />,
      },
      {
        path: "playlist/:id",
        element: <Playlist />,
      },
      {
        path: "albums",
        element: <ComingSoon />,
      },
      {
        path: "genres",
        element: <ComingSoon />,
      },
      {
        path: "artists",
        element: <ComingSoon />,
      },
      {
        path: "favourites",
        element: <ComingSoon />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Signin />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
];

export default routes;
