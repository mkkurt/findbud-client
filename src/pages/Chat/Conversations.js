import React from "react";
import { useGetConversationsQuery } from "../../features/chat/chatApiSlice";
import {
  selectCurrentConv,
  setCurrentConv,
  setPage,
  selectPage,
} from "../../features/chat/chatSlice";
import { Conversation } from "../../components/Chat/conversations/Conversation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export const Conversations = () => {
  const currentConv = useSelector(selectCurrentConv);
  const dispatch = useDispatch();
  const {
    data: conversations,
    error,
    isLoading,
    isError,
  } = useGetConversationsQuery();

  useEffect(() => {
    if (conversations?.length > 0) {
      dispatch(setCurrentConv(conversations[0]));
    }
  }, [conversations]);

  const handleClick = (conversation) => {
    dispatch(setCurrentConv(conversation));
    dispatch(setPage(1));
  };
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.data?.message}</div>
      ) : (
        <div>
          {conversations.map((conversation) => (
            <div
              key={conversation._id}
              onClick={() => handleClick(conversation)}
            >
              <Conversation
                key={conversation._id}
                conversation={conversation}
                currentConv={currentConv}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
