import React from "react";
import Navigation from "../components/Navigation/Navigation";
import { Outlet } from "react-router-dom";
import Footer from "../pages/Shared/Footer";

const Main = () => {
    return (
        <div className="slot-root">
            <div className="slot">
                <Navigation />
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Main;