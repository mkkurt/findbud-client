import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../features/auth/authSlice";
import { selectCurrentConv } from "../../../features/chat/chatSlice";

export const Conversation = ({ conversation }) => {
  const { _id, members } = conversation;
  const { userId } = useSelector(selectCurrentUser);
  const currentConv = useSelector(selectCurrentConv);
  //filter out the current user
  const otherUser = members.filter((member) => member._id !== userId)[0];
  return (
    <ConversationWrapper active={currentConv?._id === _id}>
      <ConversationImage
        //profile picture or default image
        src={
          otherUser.profilePicUrl
            ? otherUser.profilePicUrl
            : "https://www.tech101.in/wp-content/uploads/2018/07/blank-profile-picture.png"
        }
        alt="conversation image"
      />
      <ConversationName>{otherUser.username}</ConversationName>
    </ConversationWrapper>
  );
};

const ConversationWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
  background-color: ${(props) => (props.active ? "#dcf8c6" : "white")};
`;
const ConversationImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 0.5rem;
`;
const ConversationName = styled.span``;
