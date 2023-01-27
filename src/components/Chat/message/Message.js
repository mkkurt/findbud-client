import styled from "@emotion/styled";
import formatTimeAgo from "../../../utils/formatTimeAgo";
import { useState, useEffect } from "react";

export const Message = ({ message, own }) => {
  const [timeAgo, setTimeAgo] = useState(formatTimeAgo(message.createdAt));

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeAgo = formatTimeAgo(message.createdAt);
      setTimeAgo(newTimeAgo);
    }, 60000); // call every minute
    return () => clearInterval(interval);
  }, [message.createdAt]);

  return (
    <MessageWrapper own={own}>
      <MessageTop>
        <MessageImage
          src="https://sb.kaleidousercontent.com/67418/992x558/7632960ff9/people.png"
          alt="message image"
        />
        <MessageText own={own}>{message.text}</MessageText>
      </MessageTop>
      <MessageBottom>
        <MessageTime>{timeAgo}</MessageTime>
      </MessageBottom>
    </MessageWrapper>
  );
};

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  align-items: ${({ own }) => (own ? "flex-end" : "flex-start")};
`;
const MessageTop = styled.div`
  display: flex;
  align-items: center;
`;
const MessageImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 0.5rem;
`;
const MessageText = styled.p`
  padding: 0.5rem;
  border-radius: 10px;
  background-color: #ccc;
  max-width: 300px;
  overflow-wrap: break-word;
  background-color: ${({ own }) => (own ? "#dcf8c6" : "#ccc")};
`;
const MessageBottom = styled.div`
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;
const MessageTime = styled.span``;
