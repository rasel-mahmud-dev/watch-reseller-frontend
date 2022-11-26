import React from "react";
import "./style.css";

const Button = ({ className, theme = "primary", disable = false, ...attributes }) => {
    return (
        <button
            className={`my-btn font-medium px-4 py-1 rounded-md ${
                disable ? "my-btn-disable" : ""
            } my-btn-${theme} ${className}`}
            {...attributes}
        />
    );
};

export default Button;
