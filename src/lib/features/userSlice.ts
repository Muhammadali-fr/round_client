// redux stuff 
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProp } from "@/src/types/user";

interface UserState {
  data: UserProp | null;
}

const initialState: UserState = {
  data: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProp>) => {
      state.data = action.payload;
    },
    logout: (state) => {
      state.data = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
