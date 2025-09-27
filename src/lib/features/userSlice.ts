
// redux stuff 
import { createSlice } from "@reduxjs/toolkit";

// types 
import { UserProp } from "@/src/types/user";

const initialState: null | UserProp = null;


const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {

    }
})