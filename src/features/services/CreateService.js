import { useState } from "react";
import { useCreateServiceMutation } from "./servicesApiSlice";

export const CreateService = () => {
  const [createService, { isLoading, isSuccess, isError, error }] =
    useCreateServiceMutation();

  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      type: e.target.type.value,
      description: e.target.description.value,
      variants: [
        {
          name: e.target.name.value,
          price: e.target.price.value,
        },
      ],
    };
    await createService(data);
  };

  return (
    <div>
      <h2>Create Service</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label htmlFor="type">Service Type</label>
        <input
          type="text"
          name="type"
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <label htmlFor="description">Service Description</label>
        <input
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
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
