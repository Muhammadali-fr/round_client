
// redux stuff 
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// types 
import { UserProp } from "@/src/types/user";
type UserState = UserProp | null;

const initialState: null | UserProp = null;


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            return action.payload;
        },
        logout: () => {
            return null;
        }
    }
})

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;