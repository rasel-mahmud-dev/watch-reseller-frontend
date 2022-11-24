import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from  "../pages/LoginPage/Login"
import Registration from "../pages/Registration/Registration";
import Main from "../Layout/Main";
import DashboardLayout from "../Layout/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import ErrorPage from "../pages/Shared/ErrorPage";
import CategoryWatch from "../pages/CategoryWatch/CategoryWatch";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "login", element: <LoginPage /> },
            { path: "registration", element: <Registration /> },
            {
                path: "category/:id",
                element: <CategoryWatch />
            },

        ],
    },
    {
        path: "/dashboard",
        element: <DashboardLayout/>,
        errorElement: <ErrorPage />,
        children: [
            { path: "", element: <DashboardHome /> },
        ],
    },
]);

export default router


