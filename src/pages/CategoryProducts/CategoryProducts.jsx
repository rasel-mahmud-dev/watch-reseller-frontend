import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../axios";
import { useQuery } from "@tanstack/react-query";
import Product from "components/Product/Product";
import Loader from "components/Loader/Loader";

import Modal from "components/Modal/Modal";
import Button from "components/Button/Button";
import { FiLock, FiMail } from "react-icons/all";
import validator from "utils/validator";
import toast from "react-hot-toast";
import catchErrorMessage from "utils/catchErrorMessage";
import HttpResponse from "components/HttpResponse/HttpResponse";
import InputGroup from "components/InputGroup/InputGroup";
import SocialLogin from "components/SocialLogin/SocialLogin";
import useStore from "hooks/useStore";
import { fetchProductForCategory, makeOrderAction } from "context/actions/productAction";

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

    const [httpResponse, setHttpResponse] = useState({
        isSuccess: false,
        message: "",
        loading: false,
    });

    const [userInput, setUserInput] = useState({
        username: "",
        email: "",
        title: "",
        price: "",
        phone: "",
        meetingAddress: "",
    });

    useEffect(() => {
        if (bookingData && auth) {
            setUserInput((prevState) => ({
                ...prevState,
                username: auth.username,
                email: auth.email,
                title: bookingData.title,
                price: bookingData.resalePrice,
            }));
        }
    }, [auth, bookingData]);

    function handleChange(e) {
        const { name, value } = e.target;
        setUserInput((prev) => ({ ...prev, [name]: value }));
    }

    const data = {
        username: {
            label: "Seller Name",
            name: "usename",
            disabled: true,
        },
        email: {
            label: "Seller Email",
            type: "email",
            name: "email",
            disabled: true,
        },

        title: {
            label: "Title",
            name: "title",
            disabled: true,
        },

        price: {
            label: "Price",
            name: "price",
            disabled: true,
        },
        phone: {
            label: "Your Phone",
            name: "phone",
            onChange: handleChange,
        },
        meetingAddress: {
            label: "Meeting Address",
            name: "meetingAddress",
            onChange: handleChange,
        },
    };

    async function handleLogin(e) {
        e.preventDefault();
        setHttpResponse((p) => ({ ...p, loading: false }));

        // form validation
        for (let userInputKey in userInput) {
            if (!userInput[userInputKey]) {
                setHttpResponse({ loading: false, isSuccess: false, message: userInputKey + " is required" });
                toast.error(userInputKey + " is required");
                return;
            }
        }

        setHttpResponse((p) => ({ ...p, loading: true }));

        try {
            let result = await makeOrderAction({
                ...userInput,
                sellerId: bookingData.sellerId,
                productId: bookingData._id,
            });

            if (result) {
                toast.success("Your order has been place, Please Pay it.");
                setBookingData(null)
            } else {
                toast.success("Your create fail.");
            }
        } catch (ex) {
            toast.error("Your order place fail");
        } finally {
            setHttpResponse((p) => ({ ...p, loading: false }));
        }
    }

    function bookingModal() {
        return (
            <Modal className="!max-w-md" isOpen={bookingData} onClose={() => setBookingData(null)}>
                <form onSubmit={handleLogin}>
                    <h1 className=" text-center text-3xl text-dark-900 font-semibold pb-2">Order form</h1>

                    <HttpResponse state={httpResponse} />

                    {Object.keys(data).map((key, i) => (
                        <InputGroup {...data[key]} defaultValue={userInput[key]} className="mt-3" />
                    ))}

                    <Button className="mt-4 w-full">Submit Order</Button>
                </form>
            </Modal>
        );
    }

    return (
        <div className="container py-6">
            <h1 className="page-section-title !text-start mt-3">Product for Smartwatch</h1>

            {bookingModal()}

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
