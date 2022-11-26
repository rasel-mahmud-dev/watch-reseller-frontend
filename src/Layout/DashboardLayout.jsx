import React from 'react';
import Navigation from "../components/Navigation/Navigation";
import {Outlet} from "react-router-dom";
import Footer from "../pages/Shared/Footer";
import Sidebar from "../pages/Dashboard/Sidebar/Sidebar";
import useStore from "hooks/useStore";

const DashboardLayout = () => {
    const [{state: { isOpenSidebar }, actions: {toggleSidebar}}] = useStore()

    return (
        <>
            <Navigation/>
            <div className="container dashboard-wrapper flex !pl-0">
                <div className={`backdrop ${isOpenSidebar ? "backdrop-open": ""}`} onClick={toggleSidebar}></div>
                <Sidebar className={`sidebar ${isOpenSidebar ? 'sidebar-open': ''}`}/>
                <div className="content pl-0 lg:pl-4">
                    <Outlet/>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default DashboardLayout;