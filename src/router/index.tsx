import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../screens/Home";
import Dashboard from "../screens/Dashboard";
import TwitSnaps from "../screens/TwitSnaps";
import Users from "../screens/Users";
import Register from "../screens/Register";
import Metrics from "../screens/Metrics";
// import Services from "../screens/Services";
import AddService from "../screens/AddService";
import Services from "../screens/Services";

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
      {
        path: "metrics",
        element: <Metrics />,
      },

      {
        path: "services",
        children: [
          { path: "add", element: <AddService /> },
          { path: "info", element: <Services /> },
        ],
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export { Router };
