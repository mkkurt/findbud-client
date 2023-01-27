import styled from "@emotion/styled";

export const ChatUser = () => {
  return (
    <ChatUserContainer>
      <ChatUserWrapper>
        <ChatUserImgContainer>
          <ChatUserImg
            src="https://sb.kaleidousercontent.com/67418/992x558/7632960ff9/people.png"
            alt="ChatUserImg"
          />
          <ChatUserBadge />
        </ChatUserImgContainer>
        <ChatUserName>John Doe</ChatUserName>
      </ChatUserWrapper>
    </ChatUserContainer>
  );
};

const ChatUserContainer = styled.div`
  flex: 1.5;
`;
const ChatUserWrapper = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  cursor: pointer;
`;
const ChatUserImgContainer = styled.div`
  position: relative;
  margin-right: 0.5rem;
`;
const ChatUserImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #ccc;
`;
const ChatUserBadge = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: limegreen;
  top: 0;
  right: 0;
`;
const ChatUserName = styled.span``;
