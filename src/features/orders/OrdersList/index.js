import { useEffect } from "react";
import { Order } from "./Order";
import { useGetAllOrdersQuery } from "../ordersApiSlice";

export const OrdersList = () => {
  const { data, error, isError, isFetching, isLoading, isSuccess, refetch } =
    useGetAllOrdersQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const orders = data?.map((order) => <Order key={order._id} order={order} />);

  return (
    <>
      <h1>Orders List</h1>
      {isLoading ? <p>Loading...</p> : null}
      {isError ? <p>Error: {error.data?.message}</p> : null}
      {isSuccess ? <div>{orders}</div> : null}
      {isFetching ? <p>Fetching...</p> : null}
    </>
  );
};
