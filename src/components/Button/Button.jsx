import React from "react";
import "./style.css";

const Button = ({ className, theme="primary", ...attributes }) => {
    return <button className={`my-btn font-medium px-4 py-1 rounded-md my-btn-${theme} ${className}`} {...attributes} />;
};

export default Button;
