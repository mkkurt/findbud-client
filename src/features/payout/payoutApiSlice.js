import { apiSlice } from "../../app/api/apiSlice";

export const payoutApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    requestPayout: builder.mutation({
      query: () => "/payout",
      invalidatesTags: ["Balance"],
    }),
  }),
});

export const { useRequestPayoutMutation } = payoutApiSlice;
