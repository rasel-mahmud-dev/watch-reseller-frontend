import React, {Suspense} from "react";
import Navigation from "../components/Navigation/Navigation";
import { Outlet } from "react-router-dom";
import Footer from "../pages/Shared/Footer";
import Loader from "components/Loader/Loader"


const Main = () => {
    return (
        <div className="slot-root">
            <div className="slot">
                <Navigation />
                <Suspense fallback={<Loader
                    title="Please wait..."
                    size={40}
                    className="fixed top-1/4 left-1/2 transform -translate-x-1/2"
                />}>
                    <Outlet />
                </Suspense>
            </div>
            <Footer />
        </div>
    );
};

export default Main;