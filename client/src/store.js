import { configureStore } from "@reduxjs/toolkit";
import { apislice } from "./api/apiSlice";
import authReducer from './features/auth/authSlice';



export const store = configureStore({
    reducer: {
        [apislice.reducerPath]: apislice.reducer,
        auth: authReducer,
        
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apislice.middleware),
    devTools: true,
});

export default store;
