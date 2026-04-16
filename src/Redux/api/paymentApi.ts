import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/* =========================
   TYPES
========================= */

export interface CheckoutRequest {
  orderId: string;
  totalAmount: number;
}

export interface CheckoutResponse {
  success: boolean;
  url: string;
}

/* =========================
   API
========================= */

export const paymentApi = createApi({
  reducerPath: "paymentApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    credentials: "include",
 
  }),

  endpoints: (builder) => ({

    /* 🔥 CREATE STRIPE SESSION */
    createCheckoutSession: builder.mutation<
      CheckoutResponse,
      CheckoutRequest
    >({
      query: (body) => ({
        url: "/payment/checkout",
        method: "POST",
        body,
      }),
    }),
  }),
});

/* =========================
   EXPORT HOOK
========================= */

export const { useCreateCheckoutSessionMutation } = paymentApi;