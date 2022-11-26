import React, { useEffect } from "react";
import "./style.css";

const Modal = (props) => {
    const { className = "", isOpen = false, onClose, title, children } = props;

    return (
        <div className={`my-modal ${isOpen ? "modal-show" : ""}`}>
            <div className="modal-backdrop cursor-pointer" onClick={onClose}></div>
            <div className={`modal-box2 relative ${className}`}>
                <h3 className="text-lg font-bold">{title}</h3>
                {children}
            </div>
        </div>
    );
};

export default Modal;
