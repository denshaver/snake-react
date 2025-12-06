import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Game from "./components/Game.tsx";
import Menu from "./components/Menu.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu />,
  },
  {
    path: "/play",
    element: <Game />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
