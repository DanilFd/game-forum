import React from 'react';
import {Header} from "./components/header/header";
import {BrowserRouter} from "react-router-dom";
import "./index.scss"
import {Routes} from "./routes/routes";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function App() {
    return (
        <>
            <BrowserRouter>
                <div className="container">
                    <Header/>
                    <Routes/>
                </div>
            </BrowserRouter>
            <ToastContainer position="top-right"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            pauseOnHover/>
        </>
    );
}

export default App;
