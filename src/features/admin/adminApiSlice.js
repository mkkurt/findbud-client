import { apiSlice } from "../../app/api/apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    refundOrder: builder.mutation({
      query: (data) => ({
        url: "/orders/refund",
        method: "POST",
        body: { ...data },
      }),
    }),
    getRefundIssues: builder.query({
      query: () => ({
        url: "/orders/refund/issues",
        method: "GET",
      }),
    }),
  }),
});

export const { useRefundOrderMutation, useGetRefundIssuesQuery } =
  adminApiSlice;
