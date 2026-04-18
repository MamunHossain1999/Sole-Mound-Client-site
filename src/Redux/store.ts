import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";
import { productApi } from "./api/productApi";
import { reviewApi } from "./api/reviewApi";
import { wishlistApi } from "./api/wishlistApi";
import { cartApi } from "./api/cartApi";
import { historyApi } from "./api/historyApi";
import { dealApi } from './api/weeklyDealsApi';
import { trendingApi } from "./api/trendingApi";
import { paymentApi } from "./api/paymentApi";
import { orderApi } from "./api/orderApi";




export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer, 
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [historyApi.reducerPath]: historyApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [dealApi.reducerPath]: dealApi.reducer,
    [trendingApi.reducerPath]: trendingApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,


  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      productApi.middleware,
      reviewApi.middleware,
      wishlistApi.middleware,
      cartApi.middleware,
      historyApi.middleware,
      dealApi.middleware,
      trendingApi.middleware,
      paymentApi.middleware,
      orderApi.middleware,
    
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
