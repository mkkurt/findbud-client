import { useState } from "react";
import { useCreatePayoutCardMutation } from "./paymentApiSlice";

export const CreatePayoutCard = () => {
  const [createPayoutCard, { isLoading, isError, isSuccess, data, error }] =
    useCreatePayoutCardMutation();
  /*
  card: {
    number: '4242424242424242',
    name: 'Jenny Rosen',
    exp_month: 1,
    exp_year: 2024,
    cvc: '314',
  },
  */
  const [card, setCard] = useState({
    number: "",
    name: "",
    exp_month: "",
    exp_year: "",
    cvc: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPayoutCard({ card });
  };

  return (
    <div>
      <h2>Create Payout Card</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Card Number"
          value={card.number}
          onChange={(e) => setCard({ ...card, number: e.target.value })}
        />
        <input
          type="text"
          placeholder="Name"
          value={card.name}
          onChange={(e) => setCard({ ...card, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Exp Month"
          value={card.exp_month}
          onChange={(e) => setCard({ ...card, exp_month: e.target.value })}
        />
        <input
          type="text"
          placeholder="Exp Year"
          value={card.exp_year}
          onChange={(e) => setCard({ ...card, exp_year: e.target.value })}
        />
        <input
          type="text"
          placeholder="CVC"
          value={card.cvc}
          onChange={(e) => setCard({ ...card, cvc: e.target.value })}
        />
        <button type="submit">Create Payout Card</button>
        {isLoading && <p>Loading...</p>}
        {isError && <p>{error?.data?.message}</p>}
        {isSuccess && <p>Success!</p>}
      </form>
    </div>
  );
};
