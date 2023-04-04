import axios from "axios";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import { Message } from "./Message";
import { selectCurrentUser } from "../../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRef } from "react";

export const InfiniteContent = ({ conversationId }) => {
  const { userId, accessToken } = useSelector(selectCurrentUser);
  const fetchMessages = async ({ pageParam = 1 }) =>
    await axios.get(
      "/chat/message/" + conversationId + "?page=" + pageParam + "&limit=10",
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery("messages", fetchMessages, {
    getNextPageParam: (lastPage, pages) => {
      const total = lastPage.data.totalMessages;
      if (pages.length * 10 >= total) {
        return;
      } else {
        return pages.length + 1;
      }
    },
    enabled: conversationId !== null && conversationId !== undefined,
  });

  let content = null;

  useEffect(() => {
    if (conversationId) {
      refetch();
    }
  }, [conversationId]);

  if (status === "loading") {
    content = <p>Loading...</p>;
  } else if (status === "error") {
    content = <p>Error: {error.message}</p>;
  } else if (data?.pages[0]) {
    content = (
      <div
        id="scrollableDiv"
        style={{
          height: "calc(100vh - 200px)",
          overflow: "auto",
          display: "flex",
          flexDirection: "column-reverse",
        }}
      >
        <InfiniteScroll
          dataLength={data.pages.length}
          hasMore={hasNextPage}
          next={fetchNextPage}
          inverse={true}
          loader={<h4>Loading...</h4>}
          useWindow={false}
          scrollableTarget="scrollableDiv"
          style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
        >
          {data.pages.map((page, i) => {
            return page.data.messages.map((message, m) => {
              return (
                <Message
                  key={message._id}
                  message={message}
                  own={message.sender._id === userId}
                />
              );
            });
          })}
        </InfiniteScroll>
      </div>
    );
  }
  return <div>{content}</div>;
};
