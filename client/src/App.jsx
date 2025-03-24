import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard";
import Form from "./pages/Form";
import Dropdown from "./components/Dropdown";
import QuestionCard from "./components/QuestionCard";
import { data } from "./const";
import AdminReport from "./pages/AdminReport";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <h1 className="text-center text-3xl font-bold">Welcome to the App!</h1>,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
  },
  {
    path: "/form",
    element: <Form categoriesData={data} /> // Adjust props as required
  },
  {
    path:"/adminreport",
    element:<AdminReport/>
  }
]);

function App() {
  return (
    <RouterProvider router={appRouter} />
  );
}

export default App;
