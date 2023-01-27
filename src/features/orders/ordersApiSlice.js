import { apiSlice } from "../../app/api/apiSlice";

export const servicesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => "/orders",
      providesTags: ["Orders"],
    }),
    getAllBuddyOrders: builder.query({
      query: () => "/orders/buddy/all",
      providesTags: ["BuddyOrders"],
    }),
    getOrder: builder.query({
      query: (orderId) => "/orders/" + orderId,
      providesTags: ["Orders"],
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Orders"],
    }),
    createOrderIntent: builder.query({
      query: (orderId) => "/orders/intent/" + orderId,
      invalidatesTags: ["Orders"],
    }),
    acceptOrder: builder.mutation({
      query: (orderId) => ({
        url: "/orders/accept/" + orderId,
        method: "PUT",
      }),
      invalidatesTags: ["BuddyOrders"],
    }),
    completeOrder: builder.mutation({
      query: (orderId) => ({
        url: "/orders/complete/" + orderId,
        method: "PUT",
      }),
      invalidatesTags: ["BuddyOrders", "Orders"],
    }),
    cancelOrder: builder.mutation({
      query: (orderId) => ({
        url: "orders/cancel/" + orderId,
        method: "PUT",
      }),
      invalidatesTags: ["BuddyOrders", "Orders"],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetAllBuddyOrdersQuery,
  useGetOrderQuery,
  useCreateOrderMutation,
  useCreateOrderIntentQuery,
  useAcceptOrderMutation,
  useCompleteOrderMutation,
  useCancelOrderMutation,
} = servicesApiSlice;
