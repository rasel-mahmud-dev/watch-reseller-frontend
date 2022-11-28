import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Product from "components/Product/Product";
import Loader from "components/Loader/Loader";
import useStore from "hooks/useStore";
import { fetchProductForCategory } from "context/actions/productAction";
import BookingModal from "pages/Shared/BookingModal";
import { addToWishListProductAction, fetchWishlistProductsAction } from "context/actions/wishlistAction";
import useScrollTop from "hooks/useScrollTop";

import { fetchCategoriesAction } from "context/actions/categoryAction";

const CategoryProducts = () => {
    const { id } = useParams();

    const [category, setCategory] = useState(null);

    useScrollTop();

    const [
        {
            state: { auth, wishlist, categories },
        },
        dispatch,
    ] = useStore();

    useEffect(() => {
        if (!categories) {
            fetchCategoriesAction(dispatch).then((data) => {
                if (data) {
                    setCategory(data.find((cat) => cat._id === id));
                }
            });
        } else {
            setCategory(categories.find((cat) => cat._id === id));
        }
    }, [id]);

    const { isLoading, error, data: products } = fetchProductForCategory(id);

    useEffect(() => {
        if (wishlist && wishlist.length > 0) return;
        fetchWishlistProductsAction().then((items) => {
            dispatch({
                type: "FETCH_WISHLIST",
                payload: items,
            });
        });
    }, []);

    const [bookingData, setBookingData] = useState(null);

    function handleBookingClick(product) {
        setBookingData(product);
    }

    function handleClose() {
        setBookingData(null);
    }

    async function handleAddToWishList(product) {
        try {
            let data = await addToWishListProductAction(product._id);
            let wishItem = { ...product };
            wishItem._id = data._id;
            wishItem.productId = product._id;
            wishItem.price = product.resalePrice;
            dispatch({
                type: "ADD_WISHLIST",
                payload: wishItem,
            });
        } catch (ex) {}
    }

    return (
        <div className="container py-6">
            {category && <h1 className="page-section-title !text-start mt-3">Product for {category?.name}</h1>}
            <BookingModal bookingData={bookingData} auth={auth} onClose={handleClose} />

            {isLoading && (
                <div>
                    <Loader title="Product are fetching" size={28} className="flex justify-center my-10" />
                </div>
            )}

            {!products ||
                (products.length === 0 && !isLoading && (
                    <h2 className="section_title-2">No product on <span className="font-semibold">{category?.name}</span> category</h2>
                ))}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
                {products?.map((product) => (
                    <Product
                        wishlist={wishlist}
                        onAddToWishlist={handleAddToWishList}
                        onClick={() => handleBookingClick(product)}
                        product={product}
                        key={product._id}
                    />
                ))}
            </div>
        </div>
    );
};

export default CategoryProducts;
