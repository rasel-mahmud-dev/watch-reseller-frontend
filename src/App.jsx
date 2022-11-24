import React, {Suspense} from "react";
import {RouterProvider} from "react-router-dom";
import router from "./Routes/routes";
import './App.css'


// firebase app initialize
import "./firebase"


function App() {
    return (
        <Suspense fallback={<h1>Loading</h1>}>
            <RouterProvider router={router}/>
        </Suspense>
    )

}

export default App
