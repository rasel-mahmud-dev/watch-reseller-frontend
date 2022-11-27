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
import { fetchWishlistProductsAction } from "context/actions/wishlistAction";
import BookingModal from "pages/Shared/BookingModal";

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


    const [bookingData, setBookingData] = useState(null);

    function handleBookingClick(wishItem) {
        setBookingData({
            ...wishItem,
            _id: wishItem.productId,
        });
    }

    function handleClose(){
        setBookingData(null)
    }

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
            title: "actions",
            dataIndex: "",
            render: (_, wishItem) => (
                <div className="flex items-center gap-x-2">

                    <Button
                        className="flex items-center"
                        disable={wishItem.isSold}
                        onClick={()=>handleBookingClick(wishItem)}>
                        Order
                    </Button>

                    <Button
                        onClick={() => {
                            deleteWishItemId.current = wishItem._id;
                            handleDeleteActionHandler(true)}
                        }
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

    console.log(bookingData)

    return (
        <div>
            <SidebarButton>
                <h1 className="page-section-title !my-0">My Wishlist ({wishlist?.length})</h1>
            </SidebarButton>

            <BookingModal bookingData={bookingData} auth={auth} onClose={handleClose} />

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

            {!wishlist || wishlist.length === 0 ? (
                <h2 className="section_title-2">No Product found in Wishlist</h2>
            ) : (
                <div className="card">
                    <Table fixed={true} scroll={{ x: 600, y: "80vh" }} columns={columns} dataSource={wishlist ?? []} />
                </div>
            )}
        </div>
    );
};

export default Wishlist;
