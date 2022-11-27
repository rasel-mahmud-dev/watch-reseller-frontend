import React, {lazy} from "react";
import { createBrowserRouter } from "react-router-dom";


import Main  from "../Layout/Main";
import ProtectedRoute from "app/Routes/ProtectedRoute";


const HomePage = lazy(()=>import( "../pages/HomePage/HomePage"));
const LoginPage = lazy(()=>import("../pages/LoginPage/Login"))
const Registration = lazy(()=>import( "../pages/Registration/Registration"));
const DashboardLayout = lazy(()=>import( "../Layout/DashboardLayout"));
const DashboardHome = lazy(()=>import( "../pages/Dashboard/DashboardHome"));
const ErrorPage = lazy(()=>import( "../pages/Shared/ErrorPage"));
const CategoryProducts = lazy(()=>import( "pages/CategoryProducts/CategoryProducts"));
const AddProduct = lazy(()=>import( "pages/Dashboard/Seller/AddProduct"));
const SellerProducts = lazy(()=>import( "pages/Dashboard/Seller/SellerProducts"));
const SellerBuyers = lazy(()=>import( "pages/Dashboard/Seller/SellerBuyers"));
const MyOrders = lazy(()=>import( "pages/Dashboard/Buyer/MyOrders"));
const AllSellers = lazy(()=>import( "pages/Dashboard/Admin/AllSellers"));
const AllBuyers = lazy(()=>import( "pages/Dashboard/Admin/AllBuyers"));
const Payment = lazy(()=>import( "pages/Dashboard/Payment/Payment"));



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
                element: <ProtectedRoute><CategoryProducts /></ProtectedRoute>
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
            { path: "my-products", element: <ProtectedRoute role="SELLER"> <SellerProducts /> </ProtectedRoute> },
            { path: "my-buyers", element: <ProtectedRoute role="SELLER"> <SellerBuyers /> </ProtectedRoute> },
            { path: "my-orders", element: <ProtectedRoute role="BUYER" > <MyOrders /> </ProtectedRoute> },
            { path: "all-sellers", element: <ProtectedRoute role="ADMIN"> <AllSellers /> </ProtectedRoute> },
            { path: "all-buyers", element: <ProtectedRoute role="ADMIN"> <AllBuyers /> </ProtectedRoute> },
            { path: "payment/:orderId", element: <ProtectedRoute role="BUYER"> <Payment /> </ProtectedRoute> },
        ],
    },
]);

export default router


