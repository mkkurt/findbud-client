import { apiSlice } from "../../app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: () => ({
        url: "/user/info",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUserInfoQuery } = userApiSlice;
