import React, { useEffect, useState } from "react";
import Modal from "components/Modal/Modal";
import HttpResponse from "components/HttpResponse/HttpResponse";
import InputGroup from "components/InputGroup/InputGroup";
import Button from "components/Button/Button";
import toast from "react-hot-toast";
import {Link, useLocation} from "react-router-dom";
import {makeOrderAction} from "context/actions/orderAction";

const BookingModal = ({ auth, bookingData, onClose }) => {

    const location = useLocation()

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
                price: bookingData.resalePrice || bookingData.price,
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
            name: "username",
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
            } else {
                toast.success("Your create fail.");
            }
            onClose();
        } catch (ex) {
            toast.error("Your order place fail");
        } finally {
            setHttpResponse((p) => ({ ...p, loading: false }));
        }
    }

    return (
        <div>
            <Modal className={`!max-w-md ${!auth ? "!top-1/3" : ""}`} isOpen={bookingData} onClose={onClose}>
                {!auth ? (
                    <div>
                        <h1 className="text-center text-xl text-dark-900 font-semibold pb-2">
                            Please Login to Booking this
                        </h1>
                        <Button className="block mx-auto">
                            <Link to="/login" state={location.pathname}>Login</Link>
                        </Button>
                    </div>
                ) : auth.role !== "BUYER" ? (
                    <div className="text-center">
                        <h1 className="text-xl text-dark-900 font-semibold">
                            Your Are {auth.role}
                        </h1>
                        <p className="mb-4">Please Login with Buyer Account</p>
                        <Button className="block mx-auto">
                            <Link to="/login">Login Buyer Account</Link>
                        </Button>
                    </div>
                ) : (
                    <form onSubmit={handleLogin}>
                        <h1 className=" text-center text-3xl text-dark-900 font-semibold pb-2">Order form</h1>

                        <HttpResponse state={httpResponse} />

                        {Object.keys(data).map((key) => (
                            <InputGroup {...data[key]} defaultValue={userInput[key]} key={key} className="mt-3" />
                        ))}

                        <Button className="mt-4 w-full">Submit Order</Button>
                    </form>
                )}
            </Modal>
        </div>
    );
};

export default BookingModal;
