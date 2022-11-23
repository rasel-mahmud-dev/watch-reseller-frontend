import React, {Suspense} from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App.jsx";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from  "../pages/LoginPage/Login"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/login", element: <LoginPage /> },
        ],
    },
]);

export default function Route() {
    return <Suspense fallback={<h1 >Loading</h1>}>
        <RouterProvider router={router} />
    </Suspense>
}