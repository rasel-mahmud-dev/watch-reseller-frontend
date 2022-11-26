import React from "react";
import Avatar from "components/Avatar/Avatar";
import { fetchAllSellers } from "context/actions/userAction";
import date from "utils/date";
import Table from "components/Table/Table";
import SidebarButton from "components/SidebarButton/SidebarButton";

const AllSellers = () => {
    const { data: buyers } = fetchAllSellers();

    const columns = [
        { title: "SL", dataIndex: "", className: "" },
        {
            title: "image",
            dataIndex: "avatar",
            className: "",
            render: (avatar) => <Avatar imgClass="!rounded-none" className="w-20" src={avatar} username="" />,
        },
        { title: "Name", dataIndex: "username" },
        { title: "email", dataIndex: "email" },
        { title: "Join on", dataIndex: "createdAt", render: (createdAt) => date(createdAt) },
        {
            title: "status",
            dataIndex: "isVerified",
            className: "w2",
            render: (isVerified) => (isVerified ? "YES" : "NO"),
        },
    ];

    return (
        <div>
            <SidebarButton>
                <h1 className="page-section-title !my-0">All Sellers</h1>
            </SidebarButton>

            <div className="card">
                <Table fixed={true} scroll={{ x: 900, y: "80vh" }} columns={columns} dataSource={buyers} />
            </div>
        </div>
    );
};

export default AllSellers;
