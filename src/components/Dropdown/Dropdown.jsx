import React from "react";
import "./style.css";

const Dropdown = ({ auth, isOpen, children, className, ...attr }) => {
    return (
        <div className={`dropdown-panel ${isOpen ? "dropdown-panel-open" : ""} ${className}`} {...attr}>
            {children}
        </div>
    );
};

export default Dropdown;
