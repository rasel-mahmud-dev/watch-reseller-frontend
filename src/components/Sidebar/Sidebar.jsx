import React from 'react';
import useStore from "hooks/useStore";
import {Link} from "react-router-dom";
import {CgUser, FaProductHunt} from "react-icons/all";
import "./sidebar.css"
import Avatar from "components/Avatar/Avatar";

const Sidebar = ({sidebarLink, ...attr}) => {

    const [{state: { auth }}]  = useStore();

    return (
        <div {...attr}>
            <div className="p-4">
                <div className="text-center border-b-2 border-primary-200/20 pb-3">
                    <Avatar className="w-20 mx-auto" src={auth.avatar} username={auth.username} />
                    <h1 className="font-semibold text-xl my-1 text-500">{auth.username}</h1>
                    <h1 className="text-sm font-medium text-primary-500">{auth.role}</h1>
                </div>

                <div className="flex flex-col mt-2">
                    {sidebarLink?.map(item=>(
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