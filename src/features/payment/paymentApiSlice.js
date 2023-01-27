import { apiSlice } from "../../app/api/apiSlice";

export const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStripeAccountLink: builder.mutation({
      query: () => "/stripe/onboarding",
      keepUnusedDataFor: 1,
    }),
    verify: builder.query({
      query: () => "/stripe/verify",
      keepUnusedDataFor: 1,
      providesTags: ["StripeVerification"],
    }),
    getBalance: builder.query({
      query: () => "/buddy/balance",
      keepUnusedDataFor: 1,
      providesTags: ["Balance"],
    }),
    createPayoutCard: builder.mutation({
      query: (body) => ({
        url: "/buddy/payout-card",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetStripeAccountLinkMutation,
  useVerifyQuery,
  useGetBalanceQuery,
  useCreatePayoutCardMutation,
} = paymentApiSlice;
