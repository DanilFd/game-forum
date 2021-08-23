import React from 'react';
import {Header} from "./components/header/header";
import {BrowserRouter} from "react-router-dom";
import "./index.scss"
import {Routes} from "./routes";

function App() {
    return (
        <BrowserRouter>
            <div className="container">
                <Header/>
                <Routes/>
            </div>
        </BrowserRouter>
    );
}

export default App;
