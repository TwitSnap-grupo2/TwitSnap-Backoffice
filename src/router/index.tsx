import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../screens/Home";
import Dashboard from "../screens/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

const Router = () => <RouterProvider router={router} />;

export { Router };
