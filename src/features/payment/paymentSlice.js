import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
  name: "payment",
  initialState: { payment: null },
  reducers: {
    setPayment: (state, action) => {
      // set the state using spreading the action.payload
      const { stripeAccountLink } = action.payload;
      state.payment = { stripeAccountLink };
    },
    removePayment: (state, action) => {
      state.payment = null;
    },
  },
});

export const { setPayment, removePayment } = paymentSlice.actions;

export default paymentSlice.reducer;

export const selectPayment = (state) => state.payment;
