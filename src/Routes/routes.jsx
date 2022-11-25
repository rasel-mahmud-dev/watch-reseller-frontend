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
import ProtectedRoute from "app/Routes/ProtectedRoute";
import AddProduct from "pages/Dashboard/Seller/AddProduct";
import MyProducts from "pages/Dashboard/Seller/MyProducts";

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
        element: <ProtectedRoute> <DashboardLayout/> </ProtectedRoute>,
        errorElement: <ErrorPage />,
        children: [
            { path: "", element: <DashboardHome /> },
            { path: "add-product", element: <ProtectedRoute role="SELLER"> <AddProduct /> </ProtectedRoute> },
            { path: "my-products", element: <ProtectedRoute role="SELLER"> <MyProducts /> </ProtectedRoute> },
        ],
    },
]);

export default router


