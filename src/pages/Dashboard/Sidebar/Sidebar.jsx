import React from 'react';
import useStore from "hooks/useStore";
import {Link} from "react-router-dom";

const Sidebar = (props) => {

    const [{state: { auth }}]  = useStore();

    const sidebarLinks = [
        { label: "Add Product", roles: ["SELLER"], to: "/dashboard/add-product" },
        { label: "My Products", roles: ["SELLER"], to: "/dashboard/my-products" },
        { label: "My Buyers", roles: ["SELLER"], to: "/dashboard/add-product" },
    ]

    return (
        <div {...props}>
            <div className="">
                <h1>Dashboard sidebar</h1>

                <div className="flex flex-col">
                    {sidebarLinks.map(item=>(
                        item.roles.includes(auth?.role) && (
                            <Link to={item.to}>
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