import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../screens/home'

const router = createBrowserRouter(
    [{
      path: "/",
      element: <Home />
    }
  ]);

  
const Router = () => (
  <RouterProvider router={router} />
);

export { Router }