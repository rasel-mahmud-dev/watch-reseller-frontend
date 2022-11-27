import React, { useEffect, useRef, useState } from "react";
import Avatar from "components/Avatar/Avatar";
import Button from "components/Button/Button";
import useStore from "hooks/useStore";
import { MdDelete, MdOutlineAttachMoney } from "react-icons/all";
import toast from "react-hot-toast";
import ActionModal from "components/ActionModal/ActionModal";
import Table from "components/Table/Table";
import SidebarButton from "components/SidebarButton/SidebarButton";
import { deleteWishlistAction } from "context/actions/wishlistAction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";
import { fetchWishlistProductsAction } from "context/actions/wishlistAction";

const Wishlist = () => {
    const [
        {
            state: { auth, wishlist },
        },
        dispatch,
    ] = useStore();

    useEffect(() => {
        if (wishlist && wishlist.length > 0) return;
        fetchWishlistProductsAction().then((items) => {
            dispatch({
                type: "FETCH_WISHLIST",
                payload: items,
            }).catch((ex) => {});
        });
    }, []);

    const deleteWishItemId = useRef(null);
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

    // delete order and update state without re fetch order data form server
    function handleDeleteActionHandler(isYes) {
        if (isYes) {
            let isDeleted = deleteWishlistAction(deleteWishItemId.current);
            if (isDeleted) {
                toast.success("Wish Item deleted");
                dispatch({
                    type: "FETCH_WISHLIST",
                    payload: wishlist.filter((item) => item._id !== deleteWishItemId.current),
                });
            } else {
                toast.error("Wish Item delete fail.");
            }
        } else {
            deleteWishItemId.current = null;
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
            render: (picture) => <Avatar imgClass="!rounded-none" className="w-20" src={picture} username="" />,
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
            title: "actions",
            dataIndex: "",
            render: (_, product) => (
                <div className="flex items-center gap-x-2">
                    <Link to={`/dashboard/payment/${product._id}`}>
                        <Button className="flex items-center" disable={product.isSold}>
                            Order
                        </Button>
                    </Link>
                    <Button
                        onClick={() => {
                            setOpenConfirmationModal(true);
                            deleteWishItemId.current = product._id;
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
                <h1 className="page-section-title !my-0">My Wishlist ({wishlist?.length})</h1>
            </SidebarButton>

            <ActionModal
                title="Are your sure to delete?"
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
                <Table fixed={true} scroll={{ x: 600, y: "80vh" }} columns={columns} dataSource={wishlist ?? []} />
            </div>
        </div>
    );
};

export default Wishlist;
