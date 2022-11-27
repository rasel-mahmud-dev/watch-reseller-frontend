import React, { useEffect, useRef, useState } from "react";
import Avatar from "components/Avatar/Avatar";
import Button from "components/Button/Button";
import { AiFillDelete, FaBars, RiEditBoxLine } from "react-icons/all";
import Circle from "components/Circle/Circle";
import ActionModal from "components/ActionModal/ActionModal";
import { addToAdvertiseProductAction, deleteProductAction, fetchSellerProducts } from "context/actions/productAction";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import SidebarButton from "components/SidebarButton/SidebarButton";
import Table from "components/Table/Table";

const SellerProducts = () => {
    const { data: products, refetch } = fetchSellerProducts();

    const location = useLocation();

    const deleteProductId = useRef();
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

    function prepareDeleteWatch(id) {
        deleteProductId.current = id;
    }

    useEffect(() => {
        if (location.state?.isAddedProduct) {
            refetch();
        }
    }, [location.state]);

    function handleDeleteActionHandler(isYes) {
        if (isYes) {
            let isDeleted = deleteProductAction(deleteProductId.current);
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
            deleteProductId.current = null;
        }
        setOpenConfirmationModal(false);
    }

    async function addToAdvertiseHandler(productId) {
        try {
            await addToAdvertiseProductAction(productId);
            toast.success("Product successful save to for advertise.");
        } catch (ex) {
            toast.error("Product save in advertise fail.");
        }
    }

    const columns = [
        { title: "SL", dataIndex: "", className: "" },
        {
            title: "image",
            dataIndex: "picture",
            className: "",
            render: (picture) => <Avatar imgClass="!rounded-none" className="w-20" src={picture} username="" />,
        },
        { title: "title", dataIndex: "title", tdClass:"min-w-[200px]" },
        {
            title: "status",
            dataIndex: "isSold",
            className: "w2",
            render: (isSold) => (isSold ? "Sold" : "Available"),
        },
        {
            title: "original price",
            dataIndex: "originalPrice",
            className: "whitespace-nowrap",
            render: (data) => data + "Tk",
        },
        {
            title: "Reseller Price",
            dataIndex: "resalePrice",
            className: "whitespace-nowrap",
            render: (data) => data + "Tk",
        },
        { title: "condition", dataIndex: "conditionType", className: "" },
        {
            title: "Advertise",
            dataIndex: "advertise",
            render: (_, product) => (
                <Button onClick={() => addToAdvertiseHandler(product._id)} disable={product.isSold}>
                    Select for Advertise
                </Button>
            ),
        },
        {
            title: "actions",
            dataIndex: "",
            render: (_, product) => (
                <div className="flex items-center gap-x-2">
                    <Circle className="">
                        <RiEditBoxLine className="text-white" />
                    </Circle>
                    <label htmlFor="deleteConfirmationModal">
                        <Circle
                            className="!bg-red-300 "
                            onClick={() => {
                                setOpenConfirmationModal(true);
                                prepareDeleteWatch(product._id);
                            }}
                        >
                            <AiFillDelete className="text-white" />
                        </Circle>
                    </label>
                </div>
            ),
        },
    ];

    return (
        <div>
            <SidebarButton>
                <h1 className="page-section-title !my-0">My Products ({products?.length})</h1>
            </SidebarButton>

            <ActionModal
                title="Are your sure to delete this?"
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

            {!products || products.length === 0 ? (
                <h2 className="section_title-2">No product added you</h2>
            ) : (
            <div className="card">
                <Table fixed={true} scroll={{ x: 900, y: "80vh" }} columns={columns} dataSource={products} />
            </div>)}

        </div>
    );
};

export default SellerProducts;
