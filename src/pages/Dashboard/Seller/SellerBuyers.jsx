import React, {useEffect, useRef, useState} from "react";
import Avatar from "components/Avatar/Avatar";
import {fetchSellerBuyers} from "context/actions/buyerAction";



const SellerBuyers = () => {

    const {data: buyers} = fetchSellerBuyers();

    const deleteWatchId = useRef()

    const columns = ["SL","image", "name"];


    return (
        <div>
            <h1 className="page-section-title">My Buyers</h1>

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
                    {buyers?.map((buyer, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>
                                <Avatar imgClass="!rounded-none" className="w-20" src={buyer.avatar} username="" />
                            </td>
                            <td>{buyer.username}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SellerBuyers;
