import React from "react";
import Avatar from "components/Avatar/Avatar";
import {  BiCurrentLocation,  FaHeart, MdVerified } from "react-icons/all";
import Button from "components/Button/Button";
import { compareDate } from "utils/date"
import  "./style.css"

const Product = ({ product, onAddToWishlist, wishlist = [], onClick }) => {
    const {
        title,
        picture,
        _id,
        resalePrice,
        originalPrice,
        conditionType,
        purchaseDate,
        createdAt,
        description,
        location,
        address,
        seller,
    } = product;

    function isWishlisted() {
        return wishlist.findIndex((w) => w.productId === _id) !== -1;
    }

    return (
        <div className="card">
            <div className="mx-auto">
                <Avatar imgClass="!rounded-none" src={picture} className="product-thumb" alt={title} />
            </div>
            <h2 className="font-semibold text-sm text-dark-900  mt-4">
                {title?.length > 50 ? title?.substring(0, 50) + "..." : title}
            </h2>

            <div className="flex items-center mt-2">
                <Avatar imgClass="!w-5" src={seller?.avatar} username={seller?.username} />
                <div className="flex items-center gap-x-2 ml-1">
                    <h4 className="text-sm font-semibold">{seller?.username}</h4>
                    {seller?.isVerified && (
                        <MdVerified className="text-green-600" />
                    ) }
                </div>
            </div>

            <div className="text-dark-400 text-sm">
                <div className="gap-x-2 py-2 font-normal">
                    <h3 className="flex items-start">
                        <span className="min-w-[100px] block"> Resale Price</span>:
                        <span className="ml-2 text-red-400 font-medium">{resalePrice}.Tk</span>
                    </h3>
                    <h3 className="flex items-start">
                        <span className="min-w-[100px] block"> Market Price</span> :
                        <span className="ml-2 line-through decoration-red-600/30 font-medium">{originalPrice}.Tk</span>
                    </h3>
                </div>
                <h3 className="flex items-start">
                    <span className="min-w-[100px] block">Condition</span>:
                    <span className="ml-2 text-800 font-medium">{conditionType}</span>
                </h3>
                <h3 className="flex items-start">
                    <span className="min-w-[100px] block">Added on</span>:
                    <span className="ml-2 font-medium">{new Date(createdAt).toDateString()}</span>
                </h3>

                <h3 className="flex items-start">
                    <span className="min-w-[100px] block">Used</span>:
                    <span className="ml-2 font-medium">{compareDate(purchaseDate)}</span>
                </h3>

                <h3 className="flex items-center gap-x-1 mt-1">
                    <BiCurrentLocation className="" />
                    <span className=" font-medium">{location}</span>
                </h3>
            </div>

            <div className="flex items-stretch  gap-4 justify-between mt-4">
                <Button
                    onClick={onClick}
                    className="w-full !bg-opacity-20 !text-primary-600 hover:!bg-primary-700 hover:!text-white"
                >
                    Book Now
                </Button>

                {onAddToWishlist && (
                    <Button
                        onClick={() => onAddToWishlist(product)}
                        className="!bg-opacity-20 !text-dark-300 hover:!text-pink-600"
                    >
                        <FaHeart
                            className={`text-dark-300 text-xl text-inherit ${isWishlisted() ? "text-pink-600" : ""}`}
                        />
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Product;
