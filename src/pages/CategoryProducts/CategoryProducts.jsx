import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Product from "components/Product/Product";
import Loader from "components/Loader/Loader";
import useStore from "hooks/useStore";
import { fetchProductForCategory } from "context/actions/productAction";
import BookingModal from "pages/Shared/BookingModal";
import {addToWishListProductAction, fetchWishlistProductsAction} from "context/actions/wishlistAction";

const CategoryProducts = () => {
    const { id } = useParams();
    const [
        {
            state: { auth, wishlist },
        }, dispatch

    ] = useStore();

    const { isLoading, error, data: products } = fetchProductForCategory(id);

    useEffect(()=>{
        if(wishlist && wishlist.length > 0) return;
        fetchWishlistProductsAction().then(items=>{
            dispatch({
                type: "FETCH_WISHLIST",
                payload: items
            }).catch(ex=>{})
        })
    }, [])

    const [bookingData, setBookingData] = useState(null);

    function handleBookingClick(product) {
        setBookingData(product);
    }

    function handleClose(){
        setBookingData(null)
    }

   async function handleAddToWishList(productId){
        try {
            let data = await addToWishListProductAction(productId)
            dispatch({
                type: "ADD_WISHLIST",
                payload: data
            })
        }   catch (ex){

        }
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
                    <Product wishlist={wishlist} onAddToWishlist={handleAddToWishList} onClick={() => handleBookingClick(product)} product={product} key={product._id} />
                ))}
            </div>
        </div>
    );
};

export default CategoryProducts;
