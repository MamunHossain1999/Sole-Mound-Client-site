import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/* ================= TYPES ================= */

export interface Banner {
  _id: string;
  title: string;
  image: string;
  link?: string;
  description?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/* ================= API ================= */

export const bannerApi = createApi({
  reducerPath: "bannerApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://sole-mound-server.vercel.app/api",
    credentials: "include",
  }),

  tagTypes: ["Banner"],

  endpoints: (builder) => ({
    /* ===== GET BANNERS ===== */
    getBanners: builder.query<Banner[], void>({
      query: () => "/banners",

      // optional caching support
      providesTags: ["Banner"],
    }),
  }),
});

/* ================= HOOKS ================= */

export const { useGetBannersQuery } = bannerApi;