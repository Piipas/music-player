import { RouteObject } from "react-router-dom";
import Home from "@/pages/Home";
import AppLayout from "@/components/templates/app-layout";

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
    ],
  },
];

export default routes;
