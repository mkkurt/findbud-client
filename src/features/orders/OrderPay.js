import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import { useCreateOrderIntentQuery, useGetOrderQuery } from "./ordersApiSlice";
import CheckoutForm from "./CheckoutForm";
import OrderStatus from "./OrderStatus";
import { useEffect } from "react";

const stripePromise = loadStripe(
  "pk_test_51IVBR1KT4HO32usRPprCj4Wxjb1E8sh42gbQKLMeyHZpZvHIyNgaa29TUQ0BDFA4qxO3IlMQ4mXmlUOWSMM4EW5L00JeAG8PA0"
);
export const OrderPay = () => {
  const { orderId } = useParams();
  const {
    data: order,
    isLoading: orderIsLoading,
    refetch: getOrderRefetch,
  } = useGetOrderQuery(orderId);
  const {
    data: orderIntent,
    isLoading: clientSecretIsLoading,
    isError: clientSecretIsError,
    error: clientSecretError,
    refetch: getClientSecretRefetch,
  } = useCreateOrderIntentQuery(orderId);
  const clientSecret = orderIntent?.secret;

  useEffect(() => {
    // getOrderRefetch();
    // getClientSecretRefetch();
  });

  if (orderIsLoading || clientSecretIsLoading) {
    return <div>Loading...</div>;
  }

  if (clientSecretIsError) {
    return <div>Error: {clientSecretError.data.message}</div>;
  }

  const options = {
    clientSecret: clientSecret,
  };

  return (
    <div>
      <h1>OrderPay</h1>
      <p>Order ID: {orderId}</p>
      <p>Order Status: {order.status}</p>
      <p>Service Type: {order.service.type}</p>
      <p>Payment Status: {order.paymentStatus}</p>
      <p>stripePaymentIntentId: {orderIntent.stripePaymentIntentId}</p>
      <p>clientSecret: {clientSecret}</p>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm orderId={orderId} />
      </Elements>
    </div>
  );
};
