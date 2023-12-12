import { createSlice } from "@reduxjs/toolkit";

const initialBankAccount = null;

export const bankAccountSlice = createSlice({
  name: "bankAccount",
  initialState: initialBankAccount,
  reducers: {
    setBankAccount: (state, action) => {
      return action.payload;
    },
    resetBankAccount: (state) => {
      return null;
    },
  },
});

export const{
    setBankAccount,
    resetBankAccount
}=bankAccountSlice.actions


export default bankAccountSlice.reducer