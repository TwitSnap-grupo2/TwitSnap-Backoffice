import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../screens/Home";
import Dashboard from "../screens/Dashboard";
import TwitSnaps from "../screens/TwitSnaps";
import Users from "../screens/Users";
import Register from "../screens/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "twits",
        element: <TwitSnaps />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export { Router };
