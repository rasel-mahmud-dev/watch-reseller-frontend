import React, { useState } from "react";
import "./homePage.css";
import Loader from "../../components/Loader/Loader";
import catchErrorMessage from "../../utils/catchErrorMessage";
import { fetchAdvertiseProducts } from "context/actions/productAction";
import Product from "components/Product/Product";
import BookingModal from "pages/Shared/BookingModal";
import useStore from "hooks/useStore";

const AdvertiseProducts = () => {
    let { data: advertises, isLoading, isError, error } = fetchAdvertiseProducts();
    const [
        {
            state: { auth },
        },
    ] = useStore();

    const [bookingData, setBookingData] = useState(null);

    function handleBookingClick(product) {
        setBookingData(product);
    }

    return (
        <section className="section" id="advertise-product">
            <div className="container">
                <h6 className="section_sub-title">Advertises for you</h6>
                <h1 className="section_title">Best Advertises products</h1>

                <BookingModal bookingData={bookingData} auth={auth} onClose={() => setBookingData(null)} />

                {isLoading && <Loader size={30} title="Category are loading..." className="mt-28" />}
                {isError && (
                    <h1 className="text-center mt-24 text-red-500">Category load fail {catchErrorMessage(error)}</h1>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                    {advertises?.map((advertise) => (
                        <Product
                            onClick={() =>
                                handleBookingClick({
                                    ...advertise,
                                    _id: advertise.productId,
                                    advertiseId: advertise._id,
                                })
                            }
                            product={advertise}
                            key={advertise._id}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AdvertiseProducts;
