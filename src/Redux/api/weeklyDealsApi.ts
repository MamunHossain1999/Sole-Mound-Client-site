import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  quantity: number;
  dealType: "weekly" | "today" | "none";
}
export interface DealsResponse {
  success: boolean;
  data: Product[];
}

export const dealApi = createApi({
  reducerPath: "dealApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getWeeklyDeals: builder.query<Product[], void>({
      query: () => "/deals/weekly",
      transformResponse: (response: DealsResponse) => response.data,
    }),

    getTodayDeals: builder.query<Product[], void>({
      query: () => "/deals/today",
      transformResponse: (response: DealsResponse) => response.data,
    }),
  }),
});

export const { useGetWeeklyDealsQuery, useGetTodayDealsQuery } = dealApi;
