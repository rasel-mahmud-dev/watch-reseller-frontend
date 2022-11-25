import React from "react";

const Modal = (props) => {
    const { className = "", id = "1", title, children } = props;
    return (
        <div>
            <input type="checkbox" id={id} className="modal-toggle" />
            <label htmlFor={id} className="modal cursor-pointer">
                <label className={`modal-box relative ${className}`} htmlFor="">
                    <h3 className="text-lg font-bold">{title}</h3>
                    {children}
                </label>
            </label>
        </div>
    );
};

export default Modal;
