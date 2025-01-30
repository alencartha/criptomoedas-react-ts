import { createBrowserRouter } from "react-router";

//pages
import { Home } from "./pages/home";
import { Details } from "./pages/details";
import { NotFound } from "./pages/not-found";

//outlet
import { Layout } from "./components/layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
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
    ],
  },
]);

export { router };
