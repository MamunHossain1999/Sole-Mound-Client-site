import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type HistoryItem = {
  _id: string;
  product: {
    _id: string;
    name: string;
    images: string[];
    price: number;
  };
  viewedAt: string;
};

export const historyApi = createApi({
  reducerPath: "historyApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    credentials: "include",
  }),

  tagTypes: ["History"],

  endpoints: (builder) => ({
    // 🔥 ADD HISTORY
    addHistory: builder.mutation<any, string>({
      query: (productId) => ({
        url: "/history",
        method: "POST",
        body: { productId },
      }),
      invalidatesTags: ["History"],
    }),

    // 🔥 GET HISTORY
    getHistory: builder.query<HistoryItem[], void>({
      query: () => "/history",

      transformResponse: (response: any) => {
        return response.data; 
      },
    }),

    // 🔥 DELETE SINGLE HISTORY ITEM
    deleteHistoryItem: builder.mutation<any, string>({
      query: (id) => ({
        url: `/history/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["History"],
    }),

    // 🔥 CLEAR ALL HISTORY
    clearHistory: builder.mutation<any, void>({
      query: () => ({
        url: "/history/all-delete",
        method: "DELETE",
      }),
      invalidatesTags: ["History"],
    }),
  }),
});
export const {
  useAddHistoryMutation,
  useGetHistoryQuery,
  useDeleteHistoryItemMutation,
  useClearHistoryMutation,
} = historyApi;
