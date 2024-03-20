import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../../layout/Layout";
import { SigninPage } from "../../features/auth/SigninPage";
import { Homepage } from "../../features/home/Homepage";
import { SignupPage } from "../../features/auth/SignupPage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <SigninPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
]);
