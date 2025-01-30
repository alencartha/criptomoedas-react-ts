import { createBrowserRouter } from "react-router";

//pages
import { Home } from "./pages/home";
import { Details } from "./pages/details";
import { NotFound } from "./pages/not-found";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/details/:cripto",
    element: <Details />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export { router };
