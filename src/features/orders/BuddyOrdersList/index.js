import {
  useAcceptOrderMutation,
  useGetAllBuddyOrdersQuery,
} from "../ordersApiSlice";

export const BuddyOrdersList = () => {
  const {
    data,
    isFetching: getAllBuddyOrdersIsFetching,
    isError: getAllBuddyOrdersIsError,
    error: getAllBuddyOrdersError,
  } = useGetAllBuddyOrdersQuery();
  const [
    acceptOrder,
    {
      isLoading: acceptOrderIsLoading,
      isError: acceptOrderIsError,
      error: acceptOrderError,
    },
  ] = useAcceptOrderMutation();

  if (getAllBuddyOrdersIsFetching) {
    return (
      <div>
        <h2>Buddy Orders List</h2>
        <h3>Loading Orders..</h3>;
      </div>
    );
  }
  if (getAllBuddyOrdersIsError) {
    return (
      <div>
        <h2>Buddy Orders List</h2>
        <p>{getAllBuddyOrdersError.data?.message}</p>
      </div>
    );
  }

  const orders = data?.map((order) => {
    return (
      <div style={{ border: "1px solid black" }} key={order._id}>
        <h3>Order Id: {order._id}</h3>
        <p>Status: {order.status}</p>
        <p>Payment Status: {order.paymentStatus}</p>
        <button
          onClick={() => acceptOrder(order._id)}
          disabled={acceptOrderIsLoading}
        >
          Accept
        </button>
      </div>
    );
  });
  return (
    <div>
      <h2>Buddy Orders List</h2>
      {orders}
      {acceptOrderIsError ? acceptOrderError.data?.message : null}
    </div>
  );
};
