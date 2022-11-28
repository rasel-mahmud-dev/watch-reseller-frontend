import React, {useEffect, useState} from "react";
import Navigation from "../components/Navigation/Navigation";
import {Outlet, useLocation} from "react-router-dom";
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

    const location = useLocation()


    useScrollTop();

    const [activeItem, setActiveItem] = useState(0)

    const sidebarLinks = [
        { label: "Dashboard", roles: ["SELLER", "BUYER", "ADMIN"], to: "/dashboard", icon:  <Avatar imgClass="" className="w-5" src="/icons/dashboard2.svg" />},
        { label: "Add Product", roles: ["SELLER"], to: "/dashboard/add-product", icon:  <Avatar className="w-5" src="/icons/add-product.svg" />},
        { label: "My Products", roles: ["SELLER"], to: "/dashboard/my-products", icon: <Avatar className="w-5" src="/icons/product.svg" />},
        { label: "My Buyers", roles: ["SELLER"], to: "/dashboard/my-buyers", icon: <Avatar className="w-5" src="/icons/seller.svg" />},
        { label: "My Orders", roles: ["BUYER"], to: "/dashboard/my-orders", icon:  <Avatar className="w-5" src="/icons/cart.svg" />},
        { label: "My Wishlist", roles: ["BUYER"], to: "/dashboard/my-wishlist", icon:  <Avatar className="w-5" src="/icons/wishlist.svg" />},
        { label: "My Transactions", roles: ["BUYER"], to: "/dashboard/my-transactions", icon: <Avatar className="w-5" src="/icons/transaction.svg" /> },
        { label: "All Sellers", roles: ["ADMIN"], to: "/dashboard/all-sellers", icon: <Avatar className="w-5" src="/icons/seller.svg" />  },
        { label: "All Buyers", roles: ["ADMIN"], to: "/dashboard/all-buyers", icon: <Avatar className="w-5" src="/icons/user.svg" /> },
        { label: "All Transactions", roles: ["ADMIN"], to: "/dashboard/all-transactions", icon: <Avatar className="w-5" src="/icons/transaction.svg" /> },
    ]


    useEffect(()=>{
        let linkIndex = sidebarLinks.findIndex(link=> location.pathname === link.to )
        if(linkIndex !== -1){
            setActiveItem(linkIndex)
        }
    }, [location.pathname])


    return (
        <div className="slot-root">
            <div className="slot">
                <Navigation />
                <div className="container dashboard-wrapper flex !px-0 ">
                    <div className={`backdrop ${isOpenSidebar ? "backdrop-open" : ""}`} onClick={toggleSidebar}></div>
                    <Sidebar
                        activeItem={activeItem}
                        sidebarLink={sidebarLinks}
                        className={`sidebar ${isOpenSidebar ? "sidebar-open" : ""}`}
                    />
                    <div className="content">
                        <Outlet />
                    </div>
                </div>
            </div>
                <Footer />
        </div>
    );
};

export default DashboardLayout;