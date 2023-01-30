import { apiSlice } from "../../app/api/apiSlice";

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: () => "/chat/conv",
      providesTags: ["Conversations"],
      keepUnusedDataFor: 0,
    }),
    getMessages: builder.query({
      query: ({ conversationId, page }) =>
        `/chat/message/${conversationId}?page=${page}&limit=10`,
      providesTags: ["Messages"],
      transformResponse: (response) => {
        const hasNextPage = response.messages.length === 10;
        return {
          messages: response.messages,
          offset: response.offset,
          hasNextPage,
        };
      },
    }),
    sendMessage: builder.mutation({
      query: (body) => ({
        url: "/chat/message",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Messages"],
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
} = chatApiSlice;
