import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialUser = {}

export const userSlice = createSlice ({
    name : "user",
    initialState: initialUser,
    reducers:{
        setUser: (state, action) =>{
            return state =action.payload
        },
        setFirstName: (state,action)=>{
            state.setFirstName =action.payload
        },
        setLastName : (state,action)=>{
            state.lastName= action.payload
        },
        resetUser:(state,action)=>{
            return (state= initialUser)
        }
    }
})

 

export const {
    setUser,
    setFirstName,
    setLastName,
    resetUser
}= userSlice.actions

export default userSlice.reducer