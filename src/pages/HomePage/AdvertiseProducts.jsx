import React from "react";
import "./homePage.css";
import Loader from "../../components/Loader/Loader";
import catchErrorMessage from "../../utils/catchErrorMessage";
import { fetchAdvertiseProducts } from "context/actions/productAction";
import Watch from "components/Watch/Watch";

const AdvertiseProducts = () => {
    let { data: advertises, isLoading, isError, error } = fetchAdvertiseProducts();

    return (
        <section className="section">
            <div className="container">
                <h6 className="section_sub-title">Advertises for you</h6>
                <h1 className="section_title">Best Advertises products</h1>

                {isLoading && <Loader size={30} title="Category are loading..." className="mt-28" />}
                {isError && (
                    <h1 className="text-center mt-24 text-red-500">Category load fail {catchErrorMessage(error)}</h1>
                )}

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                    {advertises?.map((advertise) => (
                        <Watch watch={advertise} key={advertise._id} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AdvertiseProducts;