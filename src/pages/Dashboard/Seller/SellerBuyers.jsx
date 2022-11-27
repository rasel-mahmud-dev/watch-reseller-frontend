import React from "react";
import Avatar from "components/Avatar/Avatar";
import { fetchSellerBuyers } from "context/actions/userAction";
import date from "utils/date";
import Table from "components/Table/Table";

const SellerBuyers = () => {
    const { data: buyers } = fetchSellerBuyers();

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
            <h1 className="page-section-title">My Buyers</h1>

            {!buyers || buyers.length === 0 ? (
                <h2 className="section_title-2">No buyer buy your product yet</h2>
            ) : (
                <div className="card">
                    <Table fixed={true} scroll={{ x: 900, y: "80vh" }} columns={columns} dataSource={buyers} />
                </div>
            )}
        </div>
    );
};

export default SellerBuyers;
