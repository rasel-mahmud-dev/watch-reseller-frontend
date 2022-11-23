import {useState} from 'react'
import './App.css'
import Navigation from "./components/Navigation/Navigation";
import {Outlet} from "react-router-dom";
import useStore from "./hooks/useStore";

function App() {
    const [state]  = useStore();

    return (
        <div className="App">
            <Navigation/>
            <Outlet/>
        </div>
    )
}

export default App
