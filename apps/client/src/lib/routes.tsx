import { RouteObject } from "react-router-dom";
import Home from "@/pages/Home";
import AppLayout from "@/components/templates/app-layout";
import Artist from "@/pages/Artist";
import Playlist from "@/pages/Playlist";
import Signin from "@/pages/Signin";
import Register from "@/pages/Register";
import AuthLayout from "@/components/templates/auth-layout";

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
        path: "discover",
        element: <Home />,
      },
      {
        path: "artist/:username",
        element: <Artist />,
      },
      {
        path: "playlist/:id",
        element: <Playlist />,
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
