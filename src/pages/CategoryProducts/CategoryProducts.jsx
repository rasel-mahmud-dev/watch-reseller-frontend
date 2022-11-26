import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Product from "components/Product/Product";
import Loader from "components/Loader/Loader";
import useStore from "hooks/useStore";
import { fetchProductForCategory, makeOrderAction } from "context/actions/productAction";
import BookingModal from "pages/Shared/BookingModal";

const CategoryProducts = () => {
    const { id } = useParams();

    const [
        {
            state: { auth },
        },
    ] = useStore();

    const { isLoading, error, data: products } = fetchProductForCategory(id);

    const [bookingData, setBookingData] = useState(null);

    function handleBookingClick(product) {
        setBookingData(product);
    }

    function handleClose(){
        setBookingData(null)
    }

    return (
        <div className="container py-6">
            <h1 className="page-section-title !text-start mt-3">Product for Smartwatch</h1>

             <BookingModal bookingData={bookingData} auth={auth} onClose={handleClose} />

            {isLoading && (
                <div>
                    <Loader title="Product are fetching" size={28} className="flex justify-center my-10" />
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
                {products?.map((product) => (
                    <Product onClick={() => handleBookingClick(product)} product={product} key={product._id} />
                ))}
            </div>
        </div>
    );
};

export default CategoryProducts;
