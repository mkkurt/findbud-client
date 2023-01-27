import React from "react";
import { useGetBalanceQuery } from "./paymentApiSlice";
export const BuddyBalance = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetBalanceQuery();
  return (
    <div>
      {isLoading ? <p>Loading...</p> : null}
      {isSuccess ? (
        <>
          <p>Available Balance in Stripe: {data?.availableStripeBalance}</p>
          <p>Available Balance to Payout: {data?.availableBuddyBalance}</p>
          <p>Pending Balance in Stripe: {data?.pendingStripeBalance}</p>
          <p>Total of Completed and Unpaid Orders: {data?.totalUnpaid}</p>
        </>
      ) : null}
      {isError ? <p>Balance Error: {error?.data?.message}</p> : null}
    </div>
  );
};
