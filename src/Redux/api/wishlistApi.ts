import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// 🧠 Product type
interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
}

// ❤️ Wishlist item type
interface WishlistItem {
  _id: string;
  product: Product;
  createdAt: string;
  updatedAt: string;
}

// 📦 API response type
interface WishlistResponse {
  success: boolean;
  data: WishlistItem[];
}

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    credentials: "include",
  }),

  tagTypes: ["Wishlist"],

  endpoints: (builder) => ({

    // ➕ ADD TO WISHLIST
    addWishlist: builder.mutation<
      { success: boolean },
      string
    >({
      query: (productId) => ({
        url: "/wishlist",
        method: "POST",
        body: { productId },
      }),
      invalidatesTags: ["Wishlist"],
    }),

    // 📥 GET WISHLIST
    getWishlist: builder.query<
      WishlistResponse,
      void
    >({
      query: () => "/wishlist",
      providesTags: ["Wishlist"],
    }),

    // ❌ REMOVE FROM WISHLIST
    removeWishlist: builder.mutation<
      { success: boolean },
      string
    >({
      query: (productId) => ({
        url: `/wishlist/${productId}`, // ⚠️ এখানে wishlist _id যাবে
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),

  }),
});

export const {
  useAddWishlistMutation,
  useGetWishlistQuery,
  useRemoveWishlistMutation,
} = wishlistApi;