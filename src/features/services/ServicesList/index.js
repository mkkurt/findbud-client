import { useEffect } from "react";
import { Service } from "./Service";
import { useGetServicesPaginatedQuery } from "../servicesApiSlice";

export const ServicesList = () => {
  const { data, error, isError, isFetching, isLoading, isSuccess, refetch } =
    useGetServicesPaginatedQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const services = data?.map((service) => (
    <Service key={service._id} service={service} />
  ));

  return (
    <>
      <h1>Services List</h1>
      {isLoading ? <p>Loading...</p> : null}
      {isError ? <p>Error: {error.data?.message}</p> : null}
      {isSuccess ? <div>{services}</div> : null}
    </>
  );
};
