import { configureStore } from "@reduxjs/toolkit";

// slices 
import userReducer from "./features/userSlice";
import userProductsReducer from './features/userProducts';
import userCartReduser from './features/userCart'

export const store = configureStore({
    reducer: {
        user: userReducer,
        userProducts: userProductsReducer,
        userCart: userCartReduser,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;