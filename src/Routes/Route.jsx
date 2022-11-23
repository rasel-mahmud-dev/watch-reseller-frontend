import React, {Suspense} from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App.jsx";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from  "../pages/LoginPage/Login"
import Registration from "../pages/Registration/Registration";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/login", element: <LoginPage /> },
            { path: "/registration", element: <Registration /> },
        ],
    },
]);

export default function Route() {
    return <Suspense fallback={<h1 >Loading</h1>}>
        <RouterProvider router={router} />
    </Suspense>
}