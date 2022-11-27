import React from "react";
import Avatar from "components/Avatar/Avatar";
import { deleteSellerAction, fetchAllSellers, makeSellerVerified } from "context/actions/userAction";
import date from "utils/date";
import Table from "components/Table/Table";
import SidebarButton from "components/SidebarButton/SidebarButton";
import Button from "components/Button/Button";
import { MdDelete } from "react-icons/all";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AllSellers = () => {
    const { data: sellers } = fetchAllSellers();

    const queryClient = useQueryClient();

    // Define a mutation
    // for buyer cache delete and update without refetch data from server

    const mutation = useMutation((payload) => payload, {
        onSuccess: (payload) => {
            queryClient.setQueryData(["sellers"], (prev) => {
                if (payload.type === "delete") {
                    return prev.filter((item) => item._id !== payload.id);
                } else if (payload.type === "update") {
                    let itemIndex = prev.findIndex((item) => item._id === payload.id);
                    if (itemIndex !== -1) {
                        let update = [...prev];
                        update[itemIndex].isVerified = !update[itemIndex].isVerified;
                        return update;
                    }
                }
            });
        },
    });

    function handleSellerVerification(seller) {
        makeSellerVerified(seller._id, !seller.isVerified)
            .then(({ status }) => {
                if (status === 201) {
                    mutation.mutate({
                        type: "update",
                        id: seller._id,
                    });
                }
            })
            .catch((ex) => {});
    }

    function handleDeleteSeller(sellerId) {
        deleteSellerAction(sellerId)
            .then(({ status }) => {
                if (status === 201) {
                    mutation.mutate({
                        type: "delete",
                        id: sellerId,
                    });
                }
            })
            .catch((ex) => {});
    }

    const columns = [
        { title: "SL", dataIndex: "", className: "" },
        {
            title: "image",
            dataIndex: "avatar",
            className: "",
            render: (avatar) => <Avatar className="w-14" src={avatar} username="" />,
        },
        { title: "Name", dataIndex: "username" },
        { title: "email", dataIndex: "email" },
        { title: "Join on", dataIndex: "createdAt", render: (createdAt) => new Date(createdAt).toDateString() },
        {
            title: "Verified",
            dataIndex: "isVerified",
            className: "w2",
            render: (isVerified, seller) => (
                <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    onChange={() => handleSellerVerification(seller)}
                    checked={isVerified}
                />
            ),
        },
        {
            title: "actions",
            dataIndex: "",
            render: (_, seller) => (
                <div className="flex items-center gap-x-2">
                    <Button
                        onClick={() => {
                            handleDeleteSeller(seller._id);
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
                <h1 className="page-section-title !my-0">All Sellers</h1>
            </SidebarButton>

            { !sellers || sellers.length === 0 ? (
               <h2 className="section_title-2">No Seller Registered Yet</h2>
            )  : (

            <div className="card">
                <Table fixed={true} scroll={{ x: 900, y: "80vh" }} columns={columns} dataSource={sellers} />
            </div>
            ) }
        </div>
    );
};

export default AllSellers;
