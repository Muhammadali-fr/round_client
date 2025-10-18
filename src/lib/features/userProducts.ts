import { ProductProp } from "@/src/types/product";
import { createSlice } from "@reduxjs/toolkit";

interface UserProductsProp {
    data: ProductProp[] | null;
};

let initialState: UserProductsProp = {
    data: null,
};

const userProductsSlice = createSlice({
    name: 'userProducts',
    initialState,
    reducers: {
        setUserProducts: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const {setUserProducts} = userProductsSlice.actions;
export default userProductsSlice.reducer;