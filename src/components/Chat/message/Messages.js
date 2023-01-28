// import InfiniteScroll from "react-infinite-scroller";
import InfiniteScroll from "react-infinite-scroll-component";
import { Message } from "./Message";
import { selectCurrentUser } from "../../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
  selectCurrentConv,
  selectPage,
  setPage,
} from "../../../features/chat/chatSlice";
import {
  useGetMessagesQuery,
  useSendMessageMutation,
} from "../../../features/chat/chatApiSlice";

export const Messages = () => {
  const currentConv = useSelector(selectCurrentConv);
  const { userId } = useSelector(selectCurrentUser);

  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const page = useSelector(selectPage);
  const [hasMore, setHasMore] = useState(true);

  const { data, error, isFetching, isLoading, isError, isSuccess } =
    useGetMessagesQuery(
      {
        conversationId: currentConv?._id,
        page,
      },
      {
        skip: !currentConv,
      }
    );

  const { messages, totalMessages } = data || {};

  const [
    sendMessage,
    {
      isLoading: sendMessageIsLoading,
      isError: sendMessageIsError,
      error: sendMessageError,
    },
  ] = useSendMessageMutation();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message) {
      sendMessage({
        conversationId: currentConv._id,
        text: message,
      });
      setMessage("");
    }
  };

  const loadMore = () => {
    if (!isFetching && !isLoading && !isError) {
      dispatch(setPage(page + 1));
    }
    if (totalMessages > 0) {
      const more = Math.ceil(totalMessages / 10) > page;
      console.log(Math.ceil(totalMessages / 10), page);
      setHasMore(more);
    }
  };

  useEffect(() => {
    if (totalMessages > 0) {
      const more = Math.ceil(totalMessages / 10) > page;
      console.log(Math.ceil(totalMessages / 10), page);
      setHasMore(more);
    }
  }, [totalMessages, page]);

  let content = null;
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
        dataLength={messages?.length || page * 10}
        // dataLength={page * 10}
        hasMore={hasMore}
        next={loadMore}
        inverse={true}
        loader={<h4>Loading...</h4>}
        useWindow={false}
        scrollableTarget="scrollableDiv"
        style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
      >
        <ul className="space-y-2">
          {messages &&
            messages
              .slice()
              .sort((a, b) => a.createdAt - b.createdAt)
              .map((message) => (
                <div key={message._id}>
                  <Message
                    key={message._id}
                    message={message}
                    own={message.sender._id === userId}
                  />
                </div>
              ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
  // }
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
          <ChatBoxSubmit onClick={handleSubmit}>Send</ChatBoxSubmit>
          {sendMessageIsLoading && <p>Sending...</p>}
          {sendMessageIsError && <p>{sendMessageError.data?.message}</p>}
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
