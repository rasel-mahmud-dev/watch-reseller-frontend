import React from 'react';
import useStore from "hooks/useStore";
import {Link} from "react-router-dom";
import {CgUser, FaProductHunt} from "react-icons/all";
import "./sidebar.css"

const Sidebar = (props) => {

    const [{state: { auth }}]  = useStore();

    const sidebarLinks = [
        { label: "Add Product", roles: ["SELLER"], to: "/dashboard/add-product", icon: <FaProductHunt /> },
        { label: "My Products", roles: ["SELLER"], to: "/dashboard/my-products", icon: <FaProductHunt /> },
        { label: "My Buyers", roles: ["SELLER"], to: "/dashboard/add-product", icon: <CgUser /> },
        { label: "My Orders", roles: ["BUYER"], to: "/dashboard/my-orders", icon: <CgUser /> },
    ]

    return (
        <div {...props}>
            <div className="p-4">
                <h1>Dashboard sidebar</h1>

                <div className="flex flex-col mt-2">
                    {sidebarLinks.map(item=>(
                        item.roles.includes(auth?.role) && (
                            <Link to={item.to} className="flex items-center gap-x-1 hover:bg-primary-900/10 text-sm font-semibold py-2 px-2 rounded">
                                {item.icon}
                                {item.label}
                            </Link>
                        )
                    )) }
                </div>
            </div>

        </div>
    );
};

export default Sidebar;