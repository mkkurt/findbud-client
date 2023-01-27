import GetAccountLink from "../payment/GetAccountLink";
import { useVerifyQuery } from "../payment/paymentApiSlice";

export const StripeVerify = () => {
  const { data, isLoading, isFetching, isSuccess, isError, error } =
    useVerifyQuery();
  return (
    <div>
      {isLoading ? <p>Loading...</p> : null}
      {isSuccess ? <p>Verification: {data?.message}</p> : null}
      {isError ? (
        <p>Stripe Verification Error: {error?.data?.message}</p>
      ) : null}
      {isError && error?.data?.reason ? (
        <p>Stripe Verification Error: {error?.data?.reason}</p>
      ) : null}
      <GetAccountLink />
    </div>
  );
};
