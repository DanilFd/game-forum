import React, {useEffect} from 'react';
import {Header} from "./components/header/header";
import {useLocation} from "react-router-dom";
import "./index.scss"
import {Routes} from "./routes/routes";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import authStore from "./store/authStore";
import {PageNotFound} from "./components/pageNotFound/pageNotFound";

function App() {
    useEffect(() => authStore.checkAuth(), [])
    const {pathname} = useLocation()
    console.log(pathname)
    return (
        <>
            {
                pathname !== "/not_found" ?
                    <div className="container">
                        <Header/>
                        <Routes/>
                    </div>
                    :
                    <PageNotFound/>
            }
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
