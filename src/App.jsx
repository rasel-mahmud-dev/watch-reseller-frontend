import React, {Suspense, useEffect} from "react";
import  {Toaster} from "react-hot-toast";
import {RouterProvider} from "react-router-dom";
import router from "./Routes/routes";
import './App.css'


// firebase app initialize
import "./firebase"
import Loader from "components/Loader/Loader";


function App() {
    return (
        <div>
            <Toaster position="top-right" toastOptions={{duration: 1800}} containerClassName="mt-16"/>
            <Suspense fallback={<Loader size={50} className="fixed transform -translate-x-1/2 left-1/2 top-1/4" title="Page Loading..." />}>
                <RouterProvider router={router}/>
            </Suspense>
        </div>
    )
}

export default App
