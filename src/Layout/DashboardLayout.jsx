import React from 'react';
import Navigation from "../components/Navigation/Navigation";
import {Outlet} from "react-router-dom";
import Footer from "../pages/Shared/Footer";
import Sidebar from "../pages/Dashboard/Sidebar/Sidebar";

const DashboardLayout = () => {
    return (
        <>
            <Navigation/>
            <div className="flex">

                <Sidebar className="w-72 h-screen bg-primary-900/10 "/>
                <div className="content">
                    <Outlet/>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default DashboardLayout;