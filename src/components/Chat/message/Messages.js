import { selectCurrentUser } from "../../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import styled from "@emotion/styled";
import { selectCurrentConv } from "../../../features/chat/chatSlice";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { InfiniteContent } from "./InfiniteContent";

export const Messages = () => {
  const currentConv = useSelector(selectCurrentConv);
  const { accessToken } = useSelector(selectCurrentUser);
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

  return (
    <ChatBox>
      <ChatBoxWrapper>
        {currentConv && <InfiniteContent conversationId={currentConv._id} />}
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
  flex: 9;
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
