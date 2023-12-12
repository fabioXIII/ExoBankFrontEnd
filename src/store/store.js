import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./slice/userSlice"
import bankAccountSlice from "./slice/bankAccountSlice"
import listaBankAccountSlice from "./slice/listaBankAccountSlice"

export const store=configureStore({
      reducer :{
        user: userSlice,
        bankAccount : bankAccountSlice,
        listaBankAccount : listaBankAccountSlice
      },
})
