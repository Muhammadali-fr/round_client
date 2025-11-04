import { ProductProp } from "@/src/types/product";
import { createSlice } from "@reduxjs/toolkit";

interface UserProductsProp {
    data: ProductProp[];
};

let initialState: UserProductsProp = {
    data: [],
};

const userProductsSlice = createSlice({
    name: 'userProducts',
    initialState,
    reducers: {
        setUserProducts: (state, action) => {
            state.data = action.payload;
        },
        removeUserProduct: (state, action) => {
            if (state.data) {
                state.data = state.data?.filter((userProduct: ProductProp) => userProduct.id !== action.payload);
            };
        },
    },
});

export const { setUserProducts, removeUserProduct } = userProductsSlice.actions;
export default userProductsSlice.reducer;