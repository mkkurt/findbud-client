import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    currentConv: null,
    page: 1,
  },
  reducers: {
    setCurrentConv: (state, action) => {
      state.currentConv = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { setCurrentConv, setPage } = chatSlice.actions;

export default chatSlice.reducer;

export const selectCurrentConv = (state) => state.chat.currentConv;
export const selectPage = (state) => state.chat.page;
