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
      // transformResponse: (response, meta) => {
      //   const totalCount = meta.response.headers.get("x-total-count");
      //   return {
      //     data: response,
      //     totalCount,
      //   };
      // },
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems, { arg }) => {
        // currentCache.results?.push(...newItems.results);
        // currentCache.messages.push(...newItems.messages);
        //push new messages to the end of the array and sort by date
        if (arg.conversationId !== currentCache.messages[0]?.conversation) {
          //if the conversationId is different from the current cache, replace the cache
          currentCache.messages = newItems.messages;
        } else {
          currentCache.messages = [
            ...currentCache.messages,
            ...newItems.messages,
          ].sort((a, b) => {
            return new Date(a.createdAt) - new Date(b.createdAt);
          });
        }
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
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
                    ...draft,
                    messages: [...draft.messages, message.data],
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
  useGetMessagesQuery,
  useSendMessageMutation,
} = chatApiSlice;
