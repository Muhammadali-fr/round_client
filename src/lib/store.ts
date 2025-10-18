import { configureStore } from "@reduxjs/toolkit";

// slices 
import userReducer from "./features/userSlice";
import userProductsReducer from './features/userProducts';

export const store  = configureStore({
    reducer: {
        user: userReducer,
        userProducts: userProductsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;