import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/CarSlice";
import authApi from "./features/auth/authApi";
import authReducer from "./features/auth/authSlice";
import productsApi from "./features/products/productsApi";
import statsApi from "./features/stats/statsApi";
import ordersApi from "./features/orders/ordersApi";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [statsApi.reducerPath]: statsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(authApi.middleware, productsApi.middleware, statsApi.middleware, ordersApi.middleware),
});
