import {useState} from 'react'
import './App.css'

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="App">
            <h1 className="text-3xl font-bold underline text-primary">
                Hello world!
            </h1>

            <button className="btn btn-primary">Button</button>

        </div>
    )
}

export default App
