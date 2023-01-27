import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
      providesTags: ["Auth"],
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: { ...credentials },
      }),
      providesTags: ["Auth"],
    }),
    becomeBuddy: builder.mutation({
      query: (body) => ({
        url: "/becomebuddy",
        method: "POST",
        body: body,
        // headers: {
        //   //we send image along with the json
        //   "Content-Type": "multipart/form-data",
        // },
      }),
      onQueryStarted: (body, { dispatch, queryFulfilled }) => {
        console.log("body: ", body);
      },
      // providesTags: ["Auth"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
      }),
      invalidatesTags: [
        "User",
        "Auth",
        "StripeVerification",
        "Orders",
        "BuddyOrders",
      ],
    }),
  }),
});

export const {
  useSigninMutation,
  useSignupMutation,
  useLogoutMutation,
  useBecomeBuddyMutation,
} = authApiSlice;
