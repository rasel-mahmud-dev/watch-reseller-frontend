import React from "react";
import Avatar from "components/Avatar/Avatar";
import { fetchAllBuyers } from "context/actions/userAction";
import Table from "components/Table/Table";
import SidebarButton from "components/SidebarButton/SidebarButton";
import Button from "components/Button/Button";
import { MdDelete } from "react-icons/all";

const AllBuyers = () => {
    const { data: buyers } = fetchAllBuyers();

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
            title: "status",
            dataIndex: "isVerified",
            className: "w2",
            render: (isVerified) => (isVerified ? "YES" : "NO"),
        },
        {
            title: "actions",
            dataIndex: "",
            render: (_, buyer) => (
                <div className="flex items-center gap-x-2">
                    <Button onClick={() => {}} theme="danger" className="flex items-center px-2">
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
                <h1 className="page-section-title !my-0">All Buyers</h1>
            </SidebarButton>

            {!buyers || buyers.length === 0 ? (
                <h2 className="section_title-2">No Buyer Registered Yet</h2>
            ) : (
                <div className="card">
                    <Table fixed={true} scroll={{ x: 900, y: "80vh" }} columns={columns} dataSource={buyers} />
                </div>
            )}
        </div>
    );
};

export default AllBuyers;
