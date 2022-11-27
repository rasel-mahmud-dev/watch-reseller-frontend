import React, { useEffect } from "react";
import Navigation from "../components/Navigation/Navigation";
import { Outlet } from "react-router-dom";
import Footer from "../pages/Shared/Footer";
import Sidebar from "../components/Sidebar/Sidebar";
import useStore from "hooks/useStore";
import useScrollTop from "hooks/useScrollTop";
import Avatar from "components/Avatar/Avatar";

const DashboardLayout = () => {
    const [
        {
            state: { isOpenSidebar },
            actions: { toggleSidebar },
        },
    ] = useStore();


    useScrollTop();


    const sidebarLinks = [
        { label: "Add Product", roles: ["SELLER"], to: "/dashboard/add-product", icon:  <Avatar className="w-5" src="/icons/add-product.svg" />},
        { label: "My Products", roles: ["SELLER"], to: "/dashboard/my-products", icon: <Avatar className="w-5" src="/icons/product.svg" />},
        { label: "My Buyers", roles: ["SELLER"], to: "/dashboard/my-buyers", icon: <Avatar className="w-5" src="/icons/seller.svg" />},
        { label: "My Orders", roles: ["BUYER", "SELLER"], to: "/dashboard/my-orders", icon:  <Avatar className="w-5" src="/icons/cart.svg" />},
        { label: "My Wishlist", roles: ["BUYER"], to: "/dashboard/my-wishlist", icon:  <Avatar className="w-5" src="/icons/wishlist.svg" />},
        { label: "All Sellers", roles: ["ADMIN"], to: "/dashboard/all-sellers", icon: <Avatar className="w-5" src="/icons/seller.svg" />  },
        { label: "All Buyers", roles: ["ADMIN"], to: "/dashboard/all-buyers", icon: <Avatar className="w-5" src="/icons/user.svg" /> },
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