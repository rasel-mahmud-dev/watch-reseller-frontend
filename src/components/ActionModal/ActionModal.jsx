import React from "react";
import Modal from "components/Modal/Modal";

const ActionModal = ({ title, id, children }) => {
    return (
        <Modal id={id} className="-top-1/4">
            <h1 className="page-section-title !mt-0">{title}</h1>

            {children}
        </Modal>
    );
};

export default ActionModal;
