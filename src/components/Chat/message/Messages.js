import InfiniteScroll from "react-infinite-scroller";
import { Message } from "./Message";
import { selectCurrentUser } from "../../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import {
  selectCurrentConv,
  selectMessages,
  setCurrentConv,
} from "../../../features/chat/chatSlice";
import {
  chatApiSlice,
  useGetMessagesQuery,
  useLazyGetMoreMessagesQuery,
  useSendMessageMutation,
} from "../../../features/chat/chatApiSlice";
import axios from "axios";

export const Messages = () => {
  const currentConv = useSelector(selectCurrentConv);
  const { userId } = useSelector(selectCurrentUser);

  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  const { data, isLoading, isError, error } =
    useGetMessagesQuery(
      { conversationId: currentConv?._id },
      { skip: !currentConv }
    ) || {};

  const { data: messages, totalCount } = data || {};

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [trigger, result, lastPromiseInfo] = useLazyGetMoreMessagesQuery();

  const fetchMore = () => {
    setPage((prev) => prev + 1);
  };

  const getMoreMessages = async (page) => {
    if (!result.isLoading) {
      await trigger({
        conversationId: currentConv?._id,
        page,
      }).unwrap();
      const more = result?.data?.totalCount - messages?.length > 0;
      setHasMore(more);
      // if (totalCount > 0) {
      //   const more = Math.ceil(totalCount / 10) > page;
      //   console.log(more);
      //   setHasMore(more);
      // }
    }
  };

  useEffect(() => {
    const more = result?.data?.totalCount > page * 10;
    if (more) {
      getMoreMessages(page);
    }
  }, [page]);

  // useEffect(() => {
  //   console.log(messages);
  //   if (messages?.length > 0) {
  //     setHasMore(true);
  //   }
  // }, [messages]);

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (!isLoading && isError) {
    content = (
      <div>
        <div>Error: {error.data?.message}</div>
      </div>
    );
  } else if (!isLoading && !isError && messages?.length === 0) {
    content = <div>No messages found!</div>;
  } else if (!isLoading && !isError && messages?.length > 0) {
    content = (
      <div>
        <InfiniteScroll
          pageStart={0}
          hasMore={hasMore}
          loadMore={fetchMore}
          isReverse={true}
          loader={<h4>Loading...</h4>}
          useWindow={false}
        >
          <ul className="space-y-2">
            {messages && messages.length > 0
              ? messages
                  .slice()
                  .sort((a, b) => a.createdAt - b.createdAt)
                  .map((message) => (
                    <div ref={messagesEndRef} key={message._id}>
                      <Message
                        key={message._id}
                        message={message}
                        own={message.sender._id === userId}
                      />
                    </div>
                  ))
              : null}
          </ul>
        </InfiniteScroll>
      </div>
    );
  }
  return (
    <ChatBox>
      <ChatBoxWrapper>
        <div
          style={{
            height: "calc(100vh - 197px)",
            overflow: "auto",
          }}
        >
          {content}
        </div>
        <ChatBoxBottom>
          <ChatBoxTextArea
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <ChatBoxSubmit onClick={() => console.log("send message")}>
            Send
          </ChatBoxSubmit>
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
