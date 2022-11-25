import React from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../axios";
import { useQuery } from "@tanstack/react-query";
import Avatar from "components/Avatar/Avatar";
import Watch from "components/Watch/Watch";

const CategoryWatch = () => {
    const { id } = useParams();

    const {
        isLoading,
        error,
        data: products,
    } = useQuery({
        queryKey: ["watches", id],
        queryFn: () =>
            axios
                .get(`/api/v1/watch?categoryId=${id}`)
                .then((res) => {
                    return res.data;
                })
                .catch((ex) => {
                    return null;
                }),
    });

    if (isLoading) return "Loading...";

    if (error) return "An error has occurred: " + error.message;

    return (
        <div className="container py-6">
            <h1 className="page-section-title">Watch for Smartwatch</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-2">
                {products?.map((product) => (
                    <Watch watch={product} key={product._id} />
                ))}
            </div>
        </div>
    );
};


export default CategoryWatch;