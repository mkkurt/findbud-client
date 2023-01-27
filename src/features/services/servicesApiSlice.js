import { apiSlice } from "../../app/api/apiSlice";

export const servicesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getServicesPaginated: builder.query({
      query: () => "/services",
      providesTags: ["Services"],
    }),
    getService: builder.query({
      query: (id) => "/services/" + id,
      keepUnusedDataFor: 1,
      providesTags: ["Services"],
    }),
    getServiceVariant: builder.query({
      query: (id) => "/services/variant/" + id,
      keepUnusedDataFor: 1,
      providesTags: ["Services"],
    }),
    getBuddyServices: builder.query({
      query: (buddyId) => "/services/buddy/" + buddyId,
      keepUnusedDataFor: 1,
      providesTags: ["BuddyServices"],
    }),
    createService: builder.mutation({
      query: (data) => ({
        url: "/services",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["BuddyServices"],
    }),
    createServiceVariant: builder.mutation({
      query: (data) => ({
        url: "/services/variant",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["BuddyServices"],
    }),
    getServiceTypes: builder.query({
      query: () => "/services/types",
    }),
  }),
});

export const {
  useGetServicesPaginatedQuery,
  useGetServiceQuery,
  useGetServiceVariantQuery,
  useGetBuddyServicesQuery,
  useCreateServiceMutation,
  useCreateServiceVariantMutation,
  useGetServiceTypesQuery,
} = servicesApiSlice;
