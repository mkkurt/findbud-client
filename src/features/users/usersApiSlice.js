import { apiSlice } from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `/users/${id}`,
      // keepUnusedDataFor: 5,
    }),
    getAllUsers: builder.query({
      query: () => "/users",
      // keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetUserQuery, useGetAllUsersQuery } = usersApiSlice;
