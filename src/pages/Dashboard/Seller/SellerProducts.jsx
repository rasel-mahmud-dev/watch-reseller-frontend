import React, { useEffect, useRef, useState } from "react";
import Avatar from "components/Avatar/Avatar";
import Button from "components/Button/Button";
import { AiFillDelete, FaBars, RiEditBoxLine } from "react-icons/all";
import Circle from "components/Circle/Circle";
import ActionModal from "components/ActionModal/ActionModal";
import { addToAdvertiseProductAction, deleteProductAction, fetchSellerProducts } from "context/actions/productAction";
import {Link, useLocation} from "react-router-dom";
import toast from "react-hot-toast";
import SidebarButton from "components/SidebarButton/SidebarButton";
import Table from "components/Table/Table";
import Loader from "components/Loader/Loader";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import SEO from "components/SEO/SEO";

const SellerProducts = () => {
    const { data: products, refetch,  isLoading } = fetchSellerProducts();

    const location = useLocation();
    const queryClient = useQueryClient();

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


    // Define a mutation
    const mutation = useMutation((payload) => payload, {
        onSuccess: (payload) => {
            queryClient.setQueryData(["sellerProducts"], (prev) => {
                if (payload.type === "delete") {
                    return prev.filter((item) => item._id !== payload.id);
                }
            });
        },
    });


    function handleDeleteActionHandler(isYes) {
        if (isYes) {
            console.log(deleteProductId.current)
            let isDeleted = deleteProductAction(deleteProductId.current);
            if (isDeleted) {
                mutation.mutate({
                    type: "delete",
                    id: deleteProductId.current,
                });
                toast.success("Product delete Successfully")

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
                    <Link to={`/dashboard/update-product/${product._id}`}>
                        <Circle className="">
                            <RiEditBoxLine className="text-white" />
                        </Circle>
                    </Link>
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
            <SEO title="My Products"></SEO>
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

            {isLoading && <Loader size={30} title="My Product are loading..." className="mt-28" /> }

            {!products || products.length === 0 && !isLoading ? (
                <h2 className="section_title-2">No product added you</h2>
            ) : (
            <div className="card">
                <Table fixed={true} scroll={{ x: 900, y: "80vh" }} columns={columns} dataSource={products} />
            </div>)}

        </div>
    );
};

export default SellerProducts;
