import React, { useEffect, useRef, useState } from "react";
import Avatar from "components/Avatar/Avatar";
import Button from "components/Button/Button";
import { deleteOrderAction, fetchOrdersAction } from "context/actions/productAction";
import useStore from "hooks/useStore";
import { MdDelete, MdOutlineAttachMoney } from "react-icons/all";
import toast from "react-hot-toast";
import ActionModal from "components/ActionModal/ActionModal";

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


    const columns = ["SL", "image", "title", "Price", "Meeting Location", "Payment", "actions"];

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

            <div className="overflow-x-auto">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            {columns.map((th) => (
                                <th>{th}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((order, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>
                                    <Avatar src={order.picture} imgClass="!rounded-none" className="w-20" username="" />
                                </td>
                                <td>{order.title}</td>

                                <td>{order.price}.Taka</td>
                                <td>{order.meetingAddress}</td>
                                <td className="uppercase font-medium text-dark-800">
                                    {order.isPay ? (
                                        <span className="bg-primary-500/40 py-1 text-sm px-2 rounded-md">Paid</span>
                                    ) : (
                                        <span className="bg-dark-100/40 py-1 px-2 text-sm rounded-md">UnPaid</span>
                                    )}
                                </td>
                                <td>
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
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;
