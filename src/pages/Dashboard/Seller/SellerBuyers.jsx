import React from "react";
import Avatar from "components/Avatar/Avatar";
import { fetchSellerBuyers } from "context/actions/userAction";
import date from "utils/date";
import Table from "components/Table/Table";
import SEO from "components/SEO/SEO";
import SidebarButton from "components/SidebarButton/SidebarButton";
import Loader from "components/Loader/Loader";

const SellerBuyers = () => {
    const { data: buyers, isLoading } = fetchSellerBuyers();

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
        <div className="page">

            <SEO title="My Buyers" />
            <SidebarButton>
                <h1 className="page-section-title !my-0">My Buyers</h1>
            </SidebarButton>

            {isLoading && <Loader size={30} title="My Buyers are loading..." className="mt-28" /> }

            {!buyers || buyers.length === 0 && !isLoading ? (
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
