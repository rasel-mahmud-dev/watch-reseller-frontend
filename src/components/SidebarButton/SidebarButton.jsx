import React from 'react';
import {FaBars} from "react-icons/all";
import useStore from "hooks/useStore";
import {HiBars4} from "react-icons/hi2";

const SidebarButton = ({ children}) => {

    const [{ actions: {toggleSidebar}}] = useStore()

    return (
        <div className="flex items-center gap-x-2 my-4">
            <HiBars4 className="cursor-pointer block lg:hidden text-2xl" onClick={toggleSidebar} />
            {children}
        </div>

    );
};

export default SidebarButton;