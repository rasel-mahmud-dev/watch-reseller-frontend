import {useState} from 'react'
import './App.css'
import Navigation from "./components/Navigation/Navigation";
import {Outlet} from "react-router-dom";

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="App">
            <Navigation/>
            <Outlet/>
        </div>
    )
}

export default App
