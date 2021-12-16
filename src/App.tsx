import React, {useEffect} from 'react';
import {Header} from "./components/header/header";
import {BrowserRouter} from "react-router-dom";
import "./index.scss"
import {Routes} from "./routes/routes";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import authStore from "./store/authStore";

function App() {
    useEffect(() => authStore.checkAuth, [])
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
