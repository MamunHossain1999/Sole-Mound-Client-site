import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface AddCartPayload {
  productId: string;
  quantity?: number;
}

export const cartApi = createApi({
  reducerPath: "cartApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    credentials: "include",
  }),

  tagTypes: ["Cart"],

  endpoints: (builder) => ({
    // 🛒 ADD TO CART
    addCart: builder.mutation<any, AddCartPayload>({
      query: ({ productId, quantity = 1 }) => ({
        url: "/cart",
        method: "POST",
        body: { productId, quantity }, // ✅ fixed
      }),
      invalidatesTags: ["Cart"],
    }),

    // 🛒 GET CART
    getCart: builder.query<any, void>({
      query: () => "/cart",
      providesTags: ["Cart"],
      keepUnusedDataFor: 0, 
    }),

    // 🛒 UPDATE CART QUANTITY
    updateCartQuantity: builder.mutation<
      { success: boolean },
      { productId: string; quantity: number }
    >({
      query: (body) => ({
        url: "/cart/update",
        method: "PUT", // same addToCart logic backend এ
        body,
      }),
      invalidatesTags: ["Cart"],
    }),

    // 🗑 REMOVE FROM CART
    removeCart: builder.mutation<any, string>({
      query: (id) => ({
        url: `/single/cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    clearCart: builder.mutation<{ success: boolean }, void>({
      query: () => ({
        url: "/cart/clear",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useAddCartMutation,
  useGetCartQuery,
  useUpdateCartQuantityMutation,
  useRemoveCartMutation,
  useClearCartMutation,
} = cartApi;
