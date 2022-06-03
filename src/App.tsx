import React, {useEffect} from 'react';
import {Header} from "./components/header/header";
import {useLocation} from "react-router-dom";
import "./index.scss"
import {Routes} from "./routes/routes";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import authStore from "./store/authStore";
import {PageNotFound} from "./components/pageNotFound/pageNotFound";
import {Footer} from "./components/footer/footer";
import {ErrorBoundary} from "react-error-boundary";
import {UnexpectedError} from "./pages/unexpectedError/unexpectedError";

function App() {
    useEffect(() => authStore.checkAuth(), [])
    const {pathname} = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])
    return (
        <>
            {
                pathname !== "/not_found" ?
                    <div className="appContainer">
                        <ErrorBoundary FallbackComponent={UnexpectedError}>
                            <Header/>
                            <Routes/>
                            <Footer/>
                        </ErrorBoundary>
                    </div> :
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
