import { apiSlice } from "../../app/api/apiSlice";

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: () => "/chat/conv",
      providesTags: ["Conversations"],
      keepUnusedDataFor: 0,
    }),
    getMessages: builder.query({
      query: ({ conversationId }) =>
        `/chat/message/${conversationId}?page=1&limit=10`,
      transformResponse: (response, meta) => {
        const totalCount = meta.response.headers.get("x-total-count");
        return {
          data: response,
          totalCount,
        };
      },
    }),
    getMoreMessages: builder.query({
      query: ({ conversationId, page }) =>
        `/chat/message/${conversationId}?page=${page}&limit=10`,
      async onQueryStarted(id, { queryFulfilled, dispatch }) {
        try {
          const messages = await queryFulfilled;
          if (messages?.data?.length > 0) {
            console.log(messages?.data?.length);
            dispatch(
              apiSlice.util.updateQueryData(
                "getMessages",
                {
                  conversationId: messages?.data[0]?.conversation,
                },
                (draft) => {
                  return {
                    data: [...draft.data, ...messages.data],
                    totalCount: Number(draft.totalCount),
                  };
                }
              )
            );
          }
        } catch (err) {
          console.log("err", err);
        }
      },
    }),
    sendMessage: builder.mutation({
      query: (body) => ({
        url: "/chat/message",
        method: "POST",
        body: body,
      }),
      async onQueryStarted(id, { queryFulfilled, dispatch }) {
        try {
          const message = await queryFulfilled;
          if (message?.data) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getMessages",
                id.toString(),
                (draft) => {
                  return {
                    data: [...draft.data, message.data],
                    totalCount: draft.totalCount + 1,
                  };
                }
              )
            );
          }
        } catch (err) {
          console.log("err", err);
        }
      },
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useGetMoreMessagesQuery,
  useLazyGetMoreMessagesQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
} = chatApiSlice;
