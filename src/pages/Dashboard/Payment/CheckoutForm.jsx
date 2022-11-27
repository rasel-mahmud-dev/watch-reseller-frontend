import useStore from "hooks/useStore";
import { useState, useEffect } from "react";
import { CardElement, Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "app/axios";
import Button from "components/Button/Button";
import toast from "react-hot-toast";

function CheckoutForm({ order }) {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");

    const [
        {
            state: { auth },
        },
    ] = useStore();

    useEffect(() => {
        if(order) {
            axios
                .post("/api/v1/payment/create-payment-intent", {
                    price: order.price,
                })
                .then(({data}) => setClientSecret(data.clientSecret));
        }
    }, [order]);

    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            // return;
            return toast.success("Payment create fail. Please reload page and try again to hit pay button")
        }

        // Use elements.getElement to get a reference to the mounted Element.
        const cardElement = elements.getElement(CardElement);
        if (cardElement === null) {
            // alert("missing card Element");
            return toast.success("Payment create fail. Please reload page and try again to hit pay button")
        }

        if (!clientSecret) {
            // alert("missing payment intendes client secret  ");
            return toast.success("Payment create fail. Please reload page and try again to hit pay button")
        }

        const result = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
        });

        if (result.error) {
            // console.log(result.error);
            return toast.success("Payment create fail. Please reload page and try again to hit pay button")
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
            return toast.success("Payment create fail. Please reload page and try again to hit pay button")
        }

        if (paymentIntent.status === "succeeded") {
            // store payment info in the database
            const payment = {
                transactionId: paymentIntent.id,
                buyerId: auth._id,
                productId: order.productId,
                orderId: order._id,
                price: order.price,
            };

            // send request for creating order and transaction record
            let payResponse = await axios.post("/api/v1/payment/pay", payment);
            if (payResponse.status === 201) {
                toast.success("Your payment has been completed")
            }
        }
    };

    return (
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
    );
}

export default CheckoutForm