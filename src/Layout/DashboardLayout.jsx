import React, { useEffect } from "react";
import Navigation from "../components/Navigation/Navigation";
import { Outlet } from "react-router-dom";
import Footer from "../pages/Shared/Footer";
import Sidebar from "../components/Sidebar/Sidebar";
import useStore from "hooks/useStore";
import useScrollTop from "hooks/useScrollTop";
import {CgUser, FaProductHunt} from "react-icons/all";

const DashboardLayout = () => {
    const [
        {
            state: { isOpenSidebar },
            actions: { toggleSidebar },
        },
    ] = useStore();


    useScrollTop();


    const sidebarLinks = [
        { label: "Add Product", roles: ["SELLER"], to: "/dashboard/add-product", icon: <FaProductHunt /> },
        { label: "My Products", roles: ["SELLER"], to: "/dashboard/my-products", icon: <FaProductHunt /> },
        { label: "My Buyers", roles: ["SELLER"], to: "/dashboard/my-buyers", icon: <CgUser /> },
        { label: "My Orders", roles: ["BUYER", "SELLER"], to: "/dashboard/my-orders", icon: <CgUser /> },
        { label: "All Sellers", roles: ["ADMIN"], to: "/dashboard/all-sellers", icon: <CgUser /> },
        { label: "All Buyers", roles: ["ADMIN"], to: "/dashboard/all-buyers", icon: <CgUser /> },
    ]

    return (
        <>
            <Navigation />
            <div className="container dashboard-wrapper flex !px-0 ">
                <div className={`backdrop ${isOpenSidebar ? "backdrop-open" : ""}`} onClick={toggleSidebar}></div>
                <Sidebar sidebarLink={sidebarLinks} className={`sidebar ${isOpenSidebar ? "sidebar-open" : ""}`} />
                <div className="content">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default DashboardLayout;