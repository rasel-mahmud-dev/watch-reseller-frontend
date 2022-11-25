import React from 'react';
import Navigation from "../components/Navigation/Navigation";
import {Outlet} from "react-router-dom";
import Footer from "../pages/Shared/Footer";
import Sidebar from "../pages/Dashboard/Sidebar/Sidebar";

const DashboardLayout = () => {
    return (
        <>
            <Navigation/>
            <div className="container flex !pl-0">

                <Sidebar className="sidebar"/>
                <div className="content w-full pl-0 lg:pl-4">
                    <Outlet/>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default DashboardLayout;