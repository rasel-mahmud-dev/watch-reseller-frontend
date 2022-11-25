import React, { useEffect, useRef, useState } from "react";
import Avatar from "components/Avatar/Avatar";
import Button from "components/Button/Button";
import { fetchSellerProducts } from "context/actions/productAction";
import useStore from "hooks/useStore";

const MyOrders = () => {
    const [
        {
            state: { auth },
        },
    ] = useStore();

    const { data: orders, refetch } = fetchSellerProducts();

    const columns = [
        "SL",
        "image",
        "title",
        "status",
        "original price",
        "Reseller Price",
        "condition",
        "Advertise",
        "actions",
    ];

    return (
        <div>
            <h1 className="page-section-title">My Orders ({orders?.length})</h1>

            <div className="overflow-x-auto">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            {columns.map((th) => (
                                <th>{th}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((order, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>
                                    <Avatar imgClass="!rounded-none" className="w-20" username="" />
                                </td>
                                <td>{order.title}</td>
                                <td>{order.isPay ? "Pain" : "Unpaid"}</td>
                                <td>
                                    <Button>Pay Now</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;
