import { apiSlice } from "../../app/api/apiSlice";

export const buddiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBuddiesWithServices: builder.query({
      query: () => `/buddies/services`,
      // keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetBuddiesWithServicesQuery } = buddiesApiSlice;
