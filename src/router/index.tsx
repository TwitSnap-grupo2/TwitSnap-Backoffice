import { createBrowserRouter, RouterProvider } from 'react-router-dom'
 

const router = createBrowserRouter(
    [{
      path: "/",
      element: <div>Hi!</div>
    }
  ]);

  
const Router = () => (
  <RouterProvider router={router} />
);

export { Router }