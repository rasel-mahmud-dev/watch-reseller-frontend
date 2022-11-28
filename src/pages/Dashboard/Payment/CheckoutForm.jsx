import useStore from "hooks/useStore";
import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Button from "components/Button/Button";
import toast from "react-hot-toast";
import Modal from "components/Modal/Modal";
import Loader from "components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import axiosInstance from "app/axios";

function CheckoutForm({ order }) {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");

    const navigate = useNavigate();

    const [
        {
            state: { auth },
        },
    ] = useStore();

    useEffect(() => {
        if (order) {
            axiosInstance()
                .post("/api/v1/payment/create-payment-intent", {
                    price: (order.price * 200), // for stripe
                })
                .then(({ data }) => setClientSecret(data.clientSecret));
        }
    }, [order]);

    const [httpResponse, setHttpResponse] = useState({
        isSuccess: false,
        message: "",
        loading: false,
    });

    function checkPaymentStatus(orderId) {
        return new Promise(async (resolve) => {
            try {
                let { data } = await axiosInstance().get("/api/v1/order/" + orderId);
                if (data.isPaid) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            } catch (ex) {
                resolve(false);
            }
        });
    }

    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        setHttpResponse({ loading: true, message: "" });

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            // return;
            setHttpResponse((p) => ({ loading: false, message: "" }));
            return toast.error("Payment create fail. Please reload page and try again to hit pay button");
        }

        // check if already pay or not
        let isPaid = await checkPaymentStatus(order._id);
        if (isPaid) {
            setHttpResponse({ loading: false, message: "Already You Pay for this Product" });
            toast.success("Already You Pay for this Product");
            return;
        }

        // Use elements.getElement to get a reference to the mounted Element.
        const cardElement = elements.getElement(CardElement);
        if (cardElement === null) {
            // alert("missing card Element");
            setHttpResponse((p) => ({ loading: false, message: "" }));
            return toast.error("Payment create fail. Please reload page and try again to hit pay button");
        }

        if (!clientSecret) {
            // alert("missing payment intendes client secret  ");
            setHttpResponse((p) => ({ loading: false, message: "" }));
            return toast.error("Payment create fail. Please reload page and try again to hit pay button");
        }

        const result = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
        });

        if (result.error) {
            // console.log(result.error);
            setHttpResponse((p) => ({ loading: false, message: "" }));
            return toast.error("Payment create fail. Please reload page and try again to hit pay button");
        }

        let { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    email: auth.email,
                    address: order.address,
                    name: order.username,
                },
            },
        });

        if (error) {
            setHttpResponse((p) => ({ loading: false, message: "" }));
            return toast.error("Payment create fail. Please reload page and try again to hit pay button");
        }

        if (paymentIntent.status === "succeeded") {
            // store payment info in the database
            const payment = {
                transactionId: paymentIntent.id,
                buyerId: auth._id,
                productId: order.productId,
                orderId: order._id,
                price: order.price,
                title: order.title,
                picture: order.picture,
            };

            // send request for creating order and transaction record
            let payResponse = await axiosInstance().post("/api/v1/payment/pay", payment);
            if (payResponse.status === 201) {
                setHttpResponse({ loading: false, message: "" });
                setTimeout(() => {
                    setHttpResponse({ loading: false, message: "Your payment has been completed" });
                }, 300);

                setTimeout(() => {
                    setHttpResponse({ loading: false, message: "" });
                    navigate("/dashboard/my-orders", { state: { updateId: order._id } });
                }, 800);

                toast.success("Your payment has been completed");
            }
        }
    };

    function handleCloseBackdrop() {
        if (order && !httpResponse.loading && httpResponse.message) {
            setHttpResponse({ loading: false, message: "" });
        }
    }

    return (
        <div>
            <Modal
                className="max-w-sm"
                isOpen={httpResponse.loading || httpResponse.message}
                onClose={handleCloseBackdrop}
            >
                {httpResponse.message ? (
                    <p className="py-5 text-primary-600 font-medium text-center">{httpResponse.message}</p>
                ) : (
                    <Loader size={30} title="Payment Processing, Please wait." />
                )}
            </Modal>

            <form onSubmit={handleSubmit} className=" w-full mx-auto rounded-lg bg-primary-50/10 px-6 py-3">
                <CardElement
                    options={{
                        iconStyle: "solid",
                        style: {
                            base: {
                                iconColor: "#5cbeff",
                                color: "#3b3b3b",
                                fontSize: "16px",
                            },
                            invalid: {
                                iconColor: "#ff4e85",
                                color: "#ff4e85",
                            },
                        },
                    }}
                    className="w-full"
                />
                <Button className="mt-10 " type="submit" disable={!(clientSecret && stripe && elements)}>
                    Pay Now
                </Button>
            </form>
        </div>
    );
}

export default CheckoutForm;
