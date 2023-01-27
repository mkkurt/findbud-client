import React, { useState, useEffect } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Link } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51IVBR1KT4HO32usRPprCj4Wxjb1E8sh42gbQKLMeyHZpZvHIyNgaa29TUQ0BDFA4qxO3IlMQ4mXmlUOWSMM4EW5L00JeAG8PA0"
);

const OrderStatus = (props) => (
  <Elements stripe={stripePromise}>
    <OrderStatusWithStripe {...props} />
  </Elements>
);

const OrderStatusWithStripe = () => {
  const stripe = useStripe();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    // Retrieve the "payment_intent_client_secret" query parameter appended to
    // your return_url by Stripe.js
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    // Retrieve the PaymentIntent
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      // Inspect the PaymentIntent `status` to indicate the status of the payment
      // to your customer.
      //
      // Some payment methods will [immediately succeed or fail][0] upon
      // confirmation, while others will first enter a `processing` state.
      //
      // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Success! Payment received.");
          break;

        case "processing":
          setMessage(
            "Payment processing. We'll update you when payment is received."
          );
          break;

        case "requires_payment_method":
          // Redirect your user back to your payment page to attempt collecting
          // payment again
          setMessage("Payment failed. Please try another payment method.");
          break;

        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  return (
    <div>
      <h1>Order Status</h1>
      <p>{message}</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default OrderStatus;
