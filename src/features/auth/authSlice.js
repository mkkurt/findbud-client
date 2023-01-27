import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null },
  reducers: {
    setCredentials: (state, action) => {
      const { userId, username, email, accessToken, roles, buddyId } =
        action.payload;
      state.user = { userId, username, email, accessToken, roles, buddyId };
    },
    logOut: (state, action) => {
      state.user = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
