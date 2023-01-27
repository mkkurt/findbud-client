import { useState } from "react";
import { useCreateServiceVariantMutation } from "./servicesApiSlice";

export const CreateServiceVariant = ({ serviceId }) => {
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");

  const [createServiceVariant, { isLoading, isSuccess, isError, error }] =
    useCreateServiceVariantMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      serviceId,
      name: name,
      price: price,
    };
    await createServiceVariant(data);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label htmlFor="name">Variant Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="price">Variant Price</label>
        <input
          type="text"
          name="price"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
      {isLoading && <p>Loading...</p>}
      {isSuccess && <p>Success!</p>}
      {isError && <p>Error: {error.data?.message}</p>}
    </div>
  );
};
