import React from "react";
import Modal from "components/Modal/Modal";

const ActionModal = ({ title, isOpen, onClose, children }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} className="!top-1/4 max-w-sm">
            <h1 className="page-section-title !mt-0">{title}</h1>
            {children}
        </Modal>
    );
};

export default ActionModal;
