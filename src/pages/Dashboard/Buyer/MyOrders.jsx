import React, { useEffect, useRef, useState } from "react";
import Avatar from "components/Avatar/Avatar";
import Button from "components/Button/Button";
import useStore from "hooks/useStore";
import { MdDelete, MdOutlineAttachMoney } from "react-icons/all";
import toast from "react-hot-toast";
import ActionModal from "components/ActionModal/ActionModal";
import Table from "components/Table/Table";
import SidebarButton from "components/SidebarButton/SidebarButton";
import { deleteOrderAction, fetchOrdersAction } from "context/actions/orderAction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";

const MyOrders = () => {
    const [
        {
            state: { auth, wishlist },
        },
        dispatch,
    ] = useStore();

    const location = useLocation();

    const navigate = useNavigate();

    const { data: orders } = fetchOrdersAction();
    const queryClient = useQueryClient();

    // Define a mutation cache delete and update order without refetch data
    const mutation = useMutation((payload) => payload, {
        onSuccess: (payload) => {
            queryClient.setQueryData(["orders"], (prev) => {
                if (payload.type === "delete") {
                    return prev.filter((item) => item._id !== payload.data);
                } else if (payload.type === "update") {
                    let itemIndex = prev.findIndex((item) => item._id === payload.data);
                    if (itemIndex !== -1) {
                        let update = [...prev];
                        update[itemIndex].isPaid = true;
                        return update;
                    }
                }
            });
        },
    });

    useEffect(() => {

        if (location.state?.updateId) {

            mutation.mutate({
                data: location.state?.updateId,
                type: "update",
            });


            // also update wishlist product sales status from wishlist context state
            if(wishlist && wishlist.length > 0) {
                let order = orders.find((order) => order._id === location.state?.updateId);
                if (order) {
                    let updateWishlist = [...wishlist]
                    let wistItemIndex = updateWishlist.findIndex((wish) => wish.productId === order.productId);
                    if (wistItemIndex !== -1 && updateWishlist[wistItemIndex]) {
                        updateWishlist[wistItemIndex].isSold = true;
                        dispatch({
                            type: "FETCH_WISHLIST",
                            payload: updateWishlist,
                        })
                    }
                }
            }
        }
    }, [location.state]);


    const deleteOrderId = useRef();
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

    // delete order and update state without re fetch order data form server
    function handleDeleteActionHandler(isYes) {
        if (isYes) {
            let isDeleted = deleteOrderAction(deleteOrderId.current);
            if (isDeleted) {
                toast.success("Order has been deleted.");
                mutation.mutate({
                    data: deleteOrderId.current,
                    type: "delete",
                });
            } else {
                toast.error("Order delete fail.");
            }
        } else {
            deleteOrderId.current = null;
        }
        setOpenConfirmationModal(false);
    }

    // order table column
    const columns = [
        { title: "SL", dataIndex: "", className: "" },
        {
            title: "image",
            dataIndex: "picture",
            className: "",
            render: (picture) => <Avatar imgClass="!rounded-none" className="w-14" src={picture} username="" />,
        },
        { title: "title", dataIndex: "title", tdClass: "min-w-[200px]" },
        {
            title: "status",
            dataIndex: "isSold",
            className: "w2",
            render: (isSold) => (isSold ? "Sold out" : "Available"),
        },
        {
            title: "Price",
            dataIndex: "price",
            className: "whitespace-nowrap",
            render: (data) => data + "Tk",
        },
        {
            title: "Meeting Address",
            dataIndex: "meetingAddress",
            className: "whitespace-nowrap",
        },
        {
            title: "Payment",
            dataIndex: "isPaid",
            render: (_, order) => (
                <div>
                    {order.isPaid ? (
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
                <div className="flex items-center gap-x-2">
                    <button onClick={()=>change(order)}>Change</button>
                    <Button
                        onClick={() => navigate(`/dashboard/payment/${order._id}`)}
                        className="flex items-center px-2"
                        disable={order.isPaid}
                    >
                        <MdOutlineAttachMoney className="text-lg" />
                        Pay
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
            <SidebarButton>
                <h1 className="page-section-title !my-0">My Orders ({orders?.length})</h1>
            </SidebarButton>

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

            {!orders || orders.length === 0 ? (
                <h2 className="section_title-2">No Order found</h2>
            ) : (
                <div className="card">
                    <Table fixed={true} scroll={{ x: 600, y: "80vh" }} columns={columns} dataSource={orders ?? []} />
                </div>
            )}
        </div>
    );
};

export default MyOrders;
