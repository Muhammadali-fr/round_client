import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    data: []
}

const userCartSlice = createSlice({
    name: 'userCart',
    initialState,
    reducers: {
        setUserCart: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const { setUserCart } = userCartSlice.actions;
export default userCartSlice.reducer;