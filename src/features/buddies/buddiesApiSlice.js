import { apiSlice } from "../../app/api/apiSlice";

export const buddiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBuddiesWithServices: builder.query({
      query: ({ page, limit }) =>
        `/buddies/services?page=${page}&limit=${limit}`,
      // keepUnusedDataFor: 5,
    }),
    getBuddyInfo: builder.query({
      query: (buddyId) => `/buddies/info/${buddyId}`,
    }),
  }),
});

export const { useGetBuddiesWithServicesQuery, useGetBuddyInfoQuery } =
  buddiesApiSlice;
