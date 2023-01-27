import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    currentConv: null,
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setCurrentConv: (state, action) => {
      state.currentConv = action.payload;
    },
  },
});

export const { setMessages, setCurrentConv } = chatSlice.actions;

export default chatSlice.reducer;

export const selectMessages = (state) => state.chat.messages;
export const selectCurrentConv = (state) => state.chat.currentConv;
