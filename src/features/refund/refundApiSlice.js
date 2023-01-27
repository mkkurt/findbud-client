import { apiSlice } from "../../app/api/apiSlice";

export const refundApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRefundIssue: builder.mutation({
      query: (data) => ({
        url: "/orders/refund/issues",
        method: "POST",
        body: { ...data },
      }),
    }),
  }),
});

export const { useCreateRefundIssueMutation } = refundApiSlice;
