import { createSlice } from "@reduxjs/toolkit";

const initialListaBankAccount = [];

export const listaBankAccountSlice = createSlice({
  name: "bankAccount",
  initialState: initialListaBankAccount,
  reducers: {
    setListaBankAccount: (state, action) => {
      return action.payload;
    },
    resetListaBankAccount: (state) => {
      return null;
    },
  },
});

export const{
    setListaBankAccount,
    resetListaBankAccount
}=listaBankAccountSlice.actions


export default listaBankAccountSlice.reducer