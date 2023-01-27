import { BuddyBalance } from "../payment/BuddyBalance";
import { CreatePayoutCard } from "../payment/CreatePayoutCard";
import { useRequestPayoutMutation } from "./payoutApiSlice";

export const PayoutCard = () => {
  const [requestPayout, { data, isLoading, isSuccess, isError, error }] =
    useRequestPayoutMutation();

  return (
    <div>
      <h2>Payout</h2>
      <BuddyBalance />
      <button onClick={() => requestPayout()}>Request Payout</button>
      {isLoading ? <p>Loading...</p> : null}
      {isSuccess ? <p>Payout: {data?.message}</p> : null}
      {isError ? <p>Payout Error: {error?.data?.message}</p> : null}
      <CreatePayoutCard />
    </div>
  );
};
