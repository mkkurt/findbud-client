import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useGetBuddiesWithServicesQuery } from "./buddiesApiSlice";

export const BuddyProfilePublic = () => {
  const { buddyId } = useParams();
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");

  const { data, error, isLoading, isError } = useGetBuddiesWithServicesQuery();
  return (
    <div>
      <h1>BuddyProfilePublic</h1>
      <p>id: {buddyId}</p>
      <p>tab: {tab}</p>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {data.map((buddy) => (
            <div key={buddy._id}>
              <p>{buddy.username}</p>
              {buddy.services.map((service) => (
                <div key={service._id}>
                  <p>{service.type}</p>
                  <p>{service.description}</p>
                  <p>{service.rating}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
