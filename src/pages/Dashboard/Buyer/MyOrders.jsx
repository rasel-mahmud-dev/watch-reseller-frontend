import React, { useEffect, useRef, useState } from "react";
import Avatar from "components/Avatar/Avatar";
import Button from "components/Button/Button";
import { deleteOrderAction, fetchOrdersAction } from "context/actions/productAction";
import useStore from "hooks/useStore";
import { AiFillDelete, MdDelete, MdOutlineAttachMoney, RiEditBoxLine } from "react-icons/all";
import toast from "react-hot-toast";
import ActionModal from "components/ActionModal/ActionModal";
import Table from "components/Table/Table";
import Circle from "components/Circle/Circle";

const MyOrders = () => {
    const [
        {
            state: { auth },
        },
    ] = useStore();

    const { data: orders, refetch } = fetchOrdersAction();

    const deleteOrderId = useRef();
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

    function handleDeleteActionHandler(isYes) {
        if (isYes) {
            let isDeleted = deleteOrderAction(deleteOrderId.current);
            if (isDeleted) {
                toast.success("Product has been deleted.");
                refetch()
                    .then((r) => {})
                    .catch((ex) => {
                        console.log(ex);
                    });
            } else {
                toast.error("Product delete fail.");
            }
        } else {
            deleteOrderId.current = null;
        }
        setOpenConfirmationModal(false);
    }

    const columns = [
        { title: "SL", dataIndex: "", className: "" },
        {
            title: "image",
            dataIndex: "picture",
            className: "",
            render: (picture) => <Avatar imgClass="!rounded-none" className="w-20" src={picture} username="" />,
        },
        { title: "title", dataIndex: "title", tdClass: "min-w-[200px]" },
        {
            title: "status",
            dataIndex: "isSold",
            className: "w2",
            render: (isSold) => (isSold ? "Sold" : "Available"),
        },
        {
            title: "Price",
            dataIndex: "Price",
            className: "whitespace-nowrap",
            render: (data) => data + "Tk",
        },
        {
            title: "Meeting Location",
            dataIndex: "Meeting Location",
            className: "whitespace-nowrap",
            render: (data) => data + "Tk",
        },
        {
            title: "Payment",
            dataIndex: "isPay",
            render: (_, order) => (
                <div>
                    {order.isPay ? (
                        <span className="bg-primary-500/40 py-1 text-sm px-2 rounded-md">Paid</span>
                    ) : (
                        <span className="bg-dark-100/40 py-1 px-2 text-sm rounded-md">UnPaid</span>
                    )}
                </div>
            ),
        },
        {
            title: "actions",
            dataIndex: "",
            render: (_, order) => (
                <div className="flex items-center gap-x-1">
                    <Button className="flex items-center px-2">
                        <MdOutlineAttachMoney className="text-lg" />
                        Pay Now
                    </Button>
                    <Button
                        onClick={() => {
                            setOpenConfirmationModal(true);
                            deleteOrderId.current = order._id;
                        }}
                        theme="danger"
                        className="flex items-center px-2"
                    >
                        <MdDelete className="text-lg" />
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <h1 className="page-section-title">My Orders ({orders?.length})</h1>

            <ActionModal
                title="Are your sure to delete this order ?"
                isOpen={openConfirmationModal}
                onClose={() => setOpenConfirmationModal(false)}
            >
                <div className="mt-4 flex items-center gap-x-2 justify-end">
                    <Button theme="danger" onClick={() => handleDeleteActionHandler(true)}>
                        Yes
                    </Button>

                    <Button onClick={() => handleDeleteActionHandler(false)}>No</Button>
                </div>
            </ActionModal>

            <div className="card">
                <Table fixed={true} scroll={{ x: 600, y: "80vh" }} columns={columns} dataSource={orders} />
            </div>
        </div>
    );
};

export default MyOrders;
