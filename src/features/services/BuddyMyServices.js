import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";
import { useGetBuddyServicesQuery } from "./servicesApiSlice";
import { useEffect } from "react";
import { CreateServiceVariant } from "./CreateServiceVariant";

export const BuddyMyServices = () => {
  const { userId } = useSelector(selectCurrentUser);
  const { data, isLoading, isSuccess, isError, error, refetch } =
    useGetBuddyServicesQuery(userId);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.data.message}</p>;
  if (isSuccess) {
    return (
      <div>
        <h2>My Services</h2>
        <ul>
          {data.map((service) => (
            <li key={service._id} style={{ border: "1px solid black" }}>
              <p>Stars: {service.stars}</p>
              <p>Type: {service.type}</p>
              <p>Description: {service.description}</p>
              <h3>Variants</h3>
              {service.variants.map((variant) => (
                <div key={variant._id} style={{ border: "1px solid black" }}>
                  <p>Name: {variant.name}</p>
                  <p>Price: {variant.price}</p>
                </div>
              ))}
              <hr></hr>
              <h3>Create New Variant</h3>
              <CreateServiceVariant serviceId={service._id} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
};
