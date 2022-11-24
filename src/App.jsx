import React, {Suspense, useEffect} from "react";
import  {Toaster} from "react-hot-toast";
import {RouterProvider} from "react-router-dom";
import router from "./Routes/routes";
import './App.css'


// firebase app initialize
import "./firebase"


function App() {

    return (
        <div>
            <Toaster position="top-right" toastOptions={{duration: 1800}}/>
            <Suspense fallback={<h1>Loading</h1>}>
                <RouterProvider router={router}/>
            </Suspense>
        </div>
    )
}

export default App
