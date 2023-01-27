import { Link } from "react-router-dom";
import {
  useCancelOrderMutation,
  useCompleteOrderMutation,
} from "../ordersApiSlice";
import { useCreateRefundIssueMutation } from "../../refund/refundApiSlice";

export const Order = ({ order }) => {
  const [
    completeOrder,
    {
      isLoading: completeIsLoading,
      isError: completeIsError,
      error: completeError,
    },
  ] = useCompleteOrderMutation();

  const [
    cancelOrder,
    { isLoading: cancelIsLoading, isError: cancelIsError, error: cancelError },
  ] = useCancelOrderMutation();

  const [
    createRefundIssue,
    {
      isLoading: createRefundIssueIsLoading,
      isError: createRefundIssueIsError,
      error: createRefundIssueError,
    },
  ] = useCreateRefundIssueMutation();

  return (
    <div key={order._id} style={{ border: "1px solid black" }}>
      <p>Order ID: {order._id}</p>
      <p>Created At: {order.createdAt}</p>
      <p>Updated At: {order.updatedAt}</p>
      <p>Status: {order.status}</p>
      <p>Service Type: {order.serviceType.name}</p>
      <p>Service Variant Name: {order.serviceVariant.name}</p>
      <p>Service Variant Price: {order.serviceVariant.price}</p>
      <p>Service Description: {order.service.description}</p>
      <p>Payment Status: {order.paymentStatus}</p>
      <p>stripePaymentIntentId: {order.stripePaymentIntentId}</p>
      <button
        onClick={() =>
          createRefundIssue({
            orderId: order._id,
            reason: "I don't like it",
          })
        }
      >
        Refund Issue
      </button>
      <button onClick={() => cancelOrder(order._id)} disabled={cancelIsLoading}>
        Cancel Order
      </button>
      <button
        onClick={() => completeOrder(order._id)}
        disabled={completeIsLoading}
      >
        Complete Order
      </button>
      {createRefundIssueIsError
        ? "Error creating refund issue: " + createRefundIssueError.data?.message
        : null}
      {cancelIsError
        ? "Error cancelling order: " + cancelError.data?.message
        : null}
      {completeIsError
        ? "Error completing order: " + completeError.data?.message
        : null}
      <Link to={`/orders/${order._id}/pay`}>Pay</Link>
    </div>
  );
};
