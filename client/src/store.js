import { configureStore } from "@reduxjs/toolkit";
import { apislice } from "./api/apiSlice";
import authReducer from './features/auth/authSlice';
import cartReducer from './pages/cart/cartSlice'



export const store = configureStore({
    reducer: {
        [apislice.reducerPath]: apislice.reducer,
        auth: authReducer,
        cart:cartReducer,
        
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apislice.middleware),
    devTools: true,
});

export default store;
