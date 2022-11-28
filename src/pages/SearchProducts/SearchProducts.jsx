import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import useStore from "hooks/useStore";
import Avatar from "components/Avatar/Avatar";
import { compareDate } from "utils/date";
import { BiCurrentLocation, FaTimes, TiTimes } from "react-icons/all";
import { searchProductAction } from "context/actions/productAction";
import Circle from "components/Circle/Circle";

const SearchProducts = () => {
    const { id } = useParams();
    const [
        {
            state: { searchProducts, searchValue },
        },
        dispatch,
    ] = useStore();

    const [searchParams, setSearchParams] = useSearchParams();

    let value = searchParams.get("text");

    useEffect(() => {
        (async function () {
            let val = "";
            try {
                if (value == null || value == "") {
                    val = "";
                } else {
                    val = value;
                }
                let { status, data } = await searchProductAction(val);
                if (status === 200) {
                    dispatch({
                        type: "SET_SEARCH_RESULT",
                        payload: data,
                    });
                }
            } catch (ex) {
            } finally {
                setSearchParams({ text: val });
            }
        })();
    }, []);

    function handleClearSearch() {
        setSearchParams({ text: "" });
        searchProductAction("").then(({ status, data }) => {
            if (status === 200) {
                dispatch({
                    type: "SET_SEARCH_RESULT",
                    payload: data,
                });
            }
        });
    }

    return (
        <div className="container py-6">
            <h1 className=" flex !text-start justify-between gap-x-2">
                <div className="flex !text-start">
                    Search Result for <div className="font-semibold ml-2">{searchValue === "" ? "ALL" : value}</div>
                </div>
                <Circle className="w-auto px-2  cursor-pointer" onClick={handleClearSearch}>
                    <FaTimes className="text-sm" /> <span className="ml-1 text-sm font-medium">Clear Search</span>{" "}
                </Circle>
            </h1>

            {searchProducts && searchProducts.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
                    {searchProducts.map((product) => (
                        <div className="card " key={product._id}>
                            <div className="mx-auto">
                                <Avatar
                                    imgClass="!rounded-none"
                                    src={product.picture}
                                    className="product-thumb"
                                    alt={product.title}
                                />
                            </div>
                            <h2 className="font-semibold text-sm text-dark-900  mt-4">
                                {product.title?.length > 50 ? product.title?.substring(0, 50) + "..." : product.title}
                            </h2>

                            <div className="text-dark-400 text-sm">
                                <div className="gap-x-2 mt-2 font-normal">
                                    <h3 className="flex items-start">
                                        <span className="min-w-[100px] block">Price</span>:
                                        <span className="ml-2 text-red-400 font-medium">{product.resalePrice}.Tk</span>
                                    </h3>
                                </div>
                                <h3 className="flex items-start">
                                    <span className="min-w-[100px] block">Condition</span>:
                                    <span className="ml-2 text-800 font-medium">{product.conditionType}</span>
                                </h3>

                                <h3 className="flex items-start">
                                    <span className="min-w-[100px] block">Used</span>:
                                    <span className="ml-2 font-medium">{compareDate(product.purchaseDate)}</span>
                                </h3>

                                <h3 className="flex items-center gap-x-1 mt-1">
                                    <BiCurrentLocation className="" />
                                    <span className=" font-medium">{product.location}</span>
                                </h3>
                            </div>
                            <h1 className="text-center mt-3">
                                {product.isSold ? (
                                    <span className="text-red-500">Out of Stock</span>
                                ) : (
                                    <span className="text-primary-500">Available</span>
                                )}
                            </h1>
                        </div>
                    ))}
                </div>
            )}

            {!(searchProducts && searchProducts.length > 0) && (
                <div className="mt-10">
                    <h1 className="text-center font-medium text-xl text-dark-600">No Product for this search</h1>
                </div>
            )}
        </div>
    );
};

export default SearchProducts;
