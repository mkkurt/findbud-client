// import InfiniteScroll from "react-infinite-scroller";
import InfiniteScroll from "react-infinite-scroll-component";
import { Message } from "./Message";
import { selectCurrentUser } from "../../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import styled from "@emotion/styled";
import { selectCurrentConv } from "../../../features/chat/chatSlice";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

export const Messages = () => {
  const currentConv = useSelector(selectCurrentConv);
  const { userId, accessToken } = useSelector(selectCurrentUser);
  const queryClient = useQueryClient();

  const [message, setMessage] = useState("");

  //send message mutation
  const sendMessageMutation = useMutation(
    (body) =>
      axios.post("/chat/message", body, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }),
    {
      onSuccess: () => {
        setMessage("");
        queryClient.invalidateQueries("messages");
      },
    }
  );

  const sendMessage = (e) => {
    e.preventDefault();
    sendMessageMutation.mutate({
      conversationId: currentConv._id,
      text: message,
    });
  };
  /////////////////////////////////////////////////
  const fetchMessages = async ({ pageParam = 1 }) =>
    await axios.get(
      "/chat/message/" + currentConv?._id + "?page=" + pageParam + "&limit=10",
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
    enabled: currentConv !== null && currentConv !== undefined,
  });

  let content = null;

  useEffect(() => {
    if (currentConv) {
      refetch();
    }
  }, [currentConv]);

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
  return (
    <ChatBox>
      <ChatBoxWrapper>
        {content}
        <ChatBoxBottom>
          <ChatBoxTextArea
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <ChatBoxSubmit onClick={sendMessage}>Send</ChatBoxSubmit>
          {sendMessageMutation.isLoading && <p>Sending...</p>}
          {sendMessageMutation.isError && <p>{sendMessageMutation.error}</p>}
        </ChatBoxBottom>
      </ChatBoxWrapper>
    </ChatBox>
  );
};

const ChatBox = styled.div`
  flex: 5.5;
  height: 100%;
`;
const ChatBoxWrapper = styled.div`
  padding: 1rem;
  height: 100%;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
`;
const ChatBoxBottom = styled.div`
  display: flex;
  margin-top: 1rem;
  align-items: center;
  justify-content: space-between;
`;
const ChatBoxTextArea = styled.textarea`
  width: 80%;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  resize: none;
`;
const ChatBoxSubmit = styled.button`
  // width: 5rem;
  // height: 50px;
  border: none;
  background-color: teal;
  color: #fff;
  cursor: pointer;
  border-radius: 5px;
`;
