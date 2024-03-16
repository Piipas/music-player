import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Providers } from "./providers";
import routes from "./lib/routes";

function App() {
  const router = createBrowserRouter(routes);

  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
}

export default App;
