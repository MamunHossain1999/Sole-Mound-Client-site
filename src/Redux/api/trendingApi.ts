import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ================= TYPES =================
export interface TrendingProduct {
  _id: string;
  name: string;
  price: number;
  discount?: number;
  images?: string[];
  label?: "hot" | "new" | "sale" | "sold out" | string;
  views: number;
  salesCount: number;
  wishlistCount: number;
  createdAt: string;
  updatedAt: string;
}

// ================= API =================
export const trendingApi = createApi({
  reducerPath: "trendingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api", 
    credentials: "include", // 🔐 auth cookie
  }),

  tagTypes: ["Trending"],

  endpoints: (builder) => ({
    // 🔥 GET ALL TRENDING
    getTrendingProducts: builder.query<TrendingProduct[], void>({
      query: () => "/all-trending",
      transformResponse: (res: { success: boolean; data: TrendingProduct[] }) =>
        res.data,
      providesTags: ["Trending"],
    }),

    // 👀 ADD VIEW
    addView: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/view/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Trending"],
    }),

    // ❤️ ADD WISHLIST
    addWishlistCount: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/wishlist/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Trending"],
    }),
  }),
});

// ================= HOOKS =================
export const {
  useGetTrendingProductsQuery,
  useAddViewMutation,
  useAddWishlistCountMutation,
} = trendingApi;