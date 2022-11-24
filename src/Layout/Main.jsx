import React from 'react';
import Navigation from "../components/Navigation/Navigation";
import {Outlet} from "react-router-dom";
import Footer from "../pages/Shared/Footer";

const Main = () => {
    return (
        <>
            <Navigation />
            <Outlet />
            <Footer />
        </>
    );
};

export default Main;