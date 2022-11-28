import React, {lazy} from "react";
import { createBrowserRouter } from "react-router-dom";


import Main from "../Layout/Main";
import ProtectedRoute from "app/Routes/ProtectedRoute";
import MyTransactions from "pages/Dashboard/Buyer/MyTransactions";

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
const Wishlist = lazy(()=>import( "pages/Dashboard/Buyer/Wishlist"));
const AllSellers = lazy(()=>import( "pages/Dashboard/Admin/AllSellers"));
const AllBuyers = lazy(()=>import( "pages/Dashboard/Admin/AllBuyers"));
const Payment = lazy(()=>import( "pages/Dashboard/Payment/Payment"));
const AllTransactions = lazy(()=>import( "pages/Dashboard/Admin/AllTransactions"));

const Blogs = lazy(()=>import( "pages/Blogs/Blogs"));
const SearchProducts = lazy(()=>import( "pages/SearchProducts/SearchProducts"));



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
                element: <ProtectedRoute roles={["SELLER", "ADMIN", "BUYER"]}><CategoryProducts /></ProtectedRoute>
            },
            { path: "blogs", element: <Blogs /> },
            { path: "search", element: <SearchProducts /> },

        ],
    },
    {
        path: "/dashboard",
        element: <ProtectedRoute roles={["SELLER", "ADMIN", "BUYER"]}> <DashboardLayout/> </ProtectedRoute>,
        errorElement: <ErrorPage />,
        children: [
            { path: "", element: <DashboardHome /> },
            { path: "update-product/:productId", element: <ProtectedRoute roles={["SELLER"]}> <AddProduct /> </ProtectedRoute> },
            { path: "add-product", element: <ProtectedRoute roles={["SELLER"]}> <AddProduct /> </ProtectedRoute> },
            { path: "my-transactions", element: <ProtectedRoute roles={["BUYER"]}> <MyTransactions /> </ProtectedRoute> },
            { path: "my-products", element: <ProtectedRoute roles={["SELLER"]}> <SellerProducts /> </ProtectedRoute> },
            { path: "my-buyers", element: <ProtectedRoute roles={["SELLER"]}> <SellerBuyers /> </ProtectedRoute> },
            { path: "my-orders", element: <ProtectedRoute roles={["BUYER"]}> <MyOrders /></ProtectedRoute> },
            { path: "my-wishlist", element: <ProtectedRoute roles={["BUYER"]} > <Wishlist /> </ProtectedRoute> },
            { path: "all-sellers", element: <ProtectedRoute roles={["ADMIN"]}> <AllSellers /> </ProtectedRoute> },
            { path: "all-buyers", element: <ProtectedRoute roles={["ADMIN"]}> <AllBuyers /> </ProtectedRoute> },
            { path: "payment/:orderId", element: <ProtectedRoute roles={["BUYER"]}> <Payment /> </ProtectedRoute> },
            { path: "all-transactions", element: <ProtectedRoute roles={["ADMIN"]}> <AllTransactions /> </ProtectedRoute> },
        ],
    },
]);

export default router


