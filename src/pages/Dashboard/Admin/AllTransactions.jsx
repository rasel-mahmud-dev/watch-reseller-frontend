import React from "react";
import Avatar from "components/Avatar/Avatar";
import Table from "components/Table/Table";
import SidebarButton from "components/SidebarButton/SidebarButton";
import {  useQuery } from "@tanstack/react-query";
import Loader from "components/Loader/Loader";
import axiosInstance from "app/axios";


const AllTransactions = () => {


    const { data: transactions, isLoading } = useQuery({
        queryKey: ["transactions"],
        queryFn: () => {
            return axiosInstance()
                .get(`/api/v1/payment/transactions`)
                .then(({ data, status }) => {
                    if (status === 200) {
                        return data;
                    }
                })
                .catch((ex) => {
                    throw ex;
                });
        },
    });


    const columns = [
        { title: "SL", dataIndex: "", className: "" },
        {
            title: "image",
            dataIndex: "picture",
            className: "",
            render: (avatar) => <Avatar className="w-14" src={avatar} username="" />,
        },
        { title: "Product Title", dataIndex: "title" },
        { title: "Transaction ID", dataIndex: "transactionId" },
        { title: "Price", dataIndex: "price", render: (price) =>  price + "TK" },
        { title: "Created At", dataIndex: "createdAt", render: (createdAt) => new Date(createdAt).toDateString() },

    ];

    return (
        <div>
            <SidebarButton>
                <h1 className="page-section-title !my-0">All Transactions ({transactions?.length})</h1>
            </SidebarButton>

            {isLoading && <Loader size={30} title="Transactions are loading" className="mt-28" />}

            {!transactions || transactions?.length === 0 && !isLoading ? (
                <h2 className="section_title-2">No Transactions found</h2>
            ) : (
                <div className="card">
                    <Table fixed={true} scroll={{ x: 900, y: "80vh" }} columns={columns} dataSource={transactions} />
                </div>
            )}
        </div>
    );
};

export default AllTransactions;
