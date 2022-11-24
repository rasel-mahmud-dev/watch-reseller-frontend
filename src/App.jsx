import {useState} from 'react'
import './App.css'
import Navigation from "./components/Navigation/Navigation";
import {Outlet} from "react-router-dom";
import useStore from "./hooks/useStore";
import Footer from "./pages/Shared/Footer";

function App() {
    const [state]  = useStore();

    return (
        <div className="App">
            <Navigation/>
            <Outlet/>
            <Footer />
        </div>
    )
}

export default App
