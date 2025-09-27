
// redux stuff 
import { createSlice } from "@reduxjs/toolkit";

// types 
import { UserProp } from "@/src/types/user";

const initialState: null | UserProp = null;


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser:(state, action) => {
            state = action.payload;
        },
        logout: (state, action) => {
            state = null;
        }
    }
})