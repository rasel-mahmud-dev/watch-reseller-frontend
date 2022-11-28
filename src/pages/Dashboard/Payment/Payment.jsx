import React, { useEffect, useState } from "react";
import CheckoutForm from "pages/Dashboard/Payment/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate, useParams } from "react-router-dom";
import SidebarButton from "components/SidebarButton/SidebarButton";
import Avatar from "components/Avatar/Avatar";
import SEO from "components/SEO/SEO";
import axiosInstance from "app/axios";

const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY);

const Payment = () => {
    const [order, setOrder] = useState(null);

    const { orderId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance()
            .get("/api/v1/order/" + orderId)
            .then(({ status, data }) => {
                if (status === 200) {
                    setOrder(data);
                } else {
                    navigate("/dashboard/my-orders");
                }
            })
            .catch((ex) => {
                navigate("/dashboard/my-orders");
            });

        return () => setOrder(null);
    }, [orderId]);

    function renderOrderSummary() {
        return (
            <div className="card col-span-5">
                <h3 className="text-lg font-medium text-dark-900 mb-3 ">Order Summary</h3>

                <div className="flex items-start justify-between gap-x-2">
                    <Avatar imgClass="w-14" src={order?.picture} />
                    <h2>{order.title}</h2>
                </div>

                <div className="flex items-start gap-x-2 text-sm text-dark-300 mt-2">
                    Price:
                    <h2>{order.price} Tk</h2>
                </div>

                <div className="flex items-start gap-x-2 mt-1 text-sm text-dark-300">
                    Created:
                    <h2>{new Date(order.createdAt).toDateString()}</h2>
                </div>
            </div>
        );
    }

    return (
        <div>
            <SidebarButton>
                <h1 className="page-section-title !my-0">Payment With Card</h1>
            </SidebarButton>

            <SEO title="Payment" />

            <div className="grid grid-cols-1 md:grid-cols-12 flex-wrap gap-4 pb-20">
                <div className="card col-span-7">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm order={order} />
                    </Elements>
                </div>
                {order && renderOrderSummary()}
            </div>
        </div>
    );
};

export default Payment;
