import styled from "@emotion/styled";
import { ChatUser } from "../../components/Chat/users/ChatUser";

import { Messages } from "../../components/Chat/message/Messages";
import { Conversations } from "./Conversations";

const ChatPage = () => {
  return (
    <ChatPageWrapper>
      <ChatMenu>
        <ChatMenuWrapper>
          <ChatMenuInput placeholder="Search" />
          <Conversations />
        </ChatMenuWrapper>
      </ChatMenu>
      <Messages />
      <ChatUsersContainer>
        {/* <ChatUsersWrapper>
          <ChatUser />
          <ChatUser />
          <ChatUser />
        </ChatUsersWrapper> */}
      </ChatUsersContainer>
    </ChatPageWrapper>
  );
};

const ChatPageWrapper = styled.div`
  display: flex;
`;
const ChatMenu = styled.div`
  flex: 3.5;
`;
const ChatMenuWrapper = styled.div`
  padding: 1rem;
  height: 100%;
`;
const ChatMenuInput = styled.input`
  width: 100%;
  padding: 0.5rem 0;
  border: none;
  border-bottom: 1px solid #ccc;
`;
const ChatUsersContainer = styled.div`
  flex: 3;
`;
const ChatUsersWrapper = styled.div`
  padding: 1rem;
  // height: 100%;
`;
export default ChatPage;
