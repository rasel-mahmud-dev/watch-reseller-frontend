import React from 'react';
import {FaBars} from "react-icons/all";
import useStore from "hooks/useStore";

const SidebarButton = ({ children}) => {

    const [{ actions: {toggleSidebar}}] = useStore()

    return (
        <div className="flex items-center gap-x-2 my-4">
            <FaBars className="cursor-pointer block lg:hidden" onClick={toggleSidebar} />
            {children}
        </div>

    );
};

export default SidebarButton;