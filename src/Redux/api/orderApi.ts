import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/* =========================
   TYPES
========================= */

export interface IOrderProduct {
  productId: string;
  quantity: number;
  price: number;
  name?: string;
  image?: string;
}

export interface IShippingAddress {
  fullName: string;
  phone: string;
  email?: string;
  postalCode: string;
  address: string;
  city: string;
  country: string;
}

export type OrderStatus = "pending" | "processing" | "completed" | "cancelled";

export type PaymentStatus = "unpaid" | "paid" | "failed";

/* =========================
   ORDER TYPE
========================= */

export interface IOrder {
  _id: string;
  userId: string;

  products: IOrderProduct[];
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  shippingAddress: IShippingAddress;
  transactionId?: string | null;
  createdAt: string;
  updatedAt: string;
}

/* =========================
   REQUEST TYPES
========================= */

export interface CreateOrderRequest {
  products: IOrderProduct[];
  totalAmount: number;
  shippingAddress: IShippingAddress;
  paymentMethod?: "stripe" | "sslcommerz" | "cash";
}

export interface UpdateOrderStatusRequest {
  id: string;
  status: OrderStatus;
}

export interface UpdatePaymentStatusRequest {
  id: string;
  paymentStatus: PaymentStatus;
}

/* =========================
   API RESPONSE WRAPPER
========================= */

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

/* =========================
   FORMAT FUNCTION (UI FRIENDLY)
========================= */

const formatOrder = (order: IOrder) => {
  return {
    id: order._id,
    status: order.status,
    date: new Date(order.createdAt).toLocaleDateString(),

    products: order.products,

    name: order.products?.[0]?.name,
    price: order.products?.[0]?.price,
    quantity: order.products?.[0]?.quantity,
    image: order.products?.[0]?.image,

    total: `$${order.totalAmount}`,

    steps: ["Ordered", "Processing", "Packaging", "Delivered"],

    shipping: {
      name: order.shippingAddress?.fullName,
      email: order.shippingAddress?.email || "N/A",
      postalCode: order.shippingAddress?.postalCode || "N/A",

      address: order.shippingAddress?.address,
      phone: order.shippingAddress?.phone,
      city: order.shippingAddress?.city,
      country: order.shippingAddress?.country,
    },

    summary: {
      subtotal: order.totalAmount,
      shipping: 0,
      tax: 0,
      total: order.totalAmount,
    },
  };
};

/* =========================
   API SLICE
========================= */

export const orderApi = createApi({
  reducerPath: "orderApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    credentials: "include",
  }),

  tagTypes: ["Order"],

  endpoints: (builder) => ({
    /* ================= CREATE ORDER ================= */
    createOrder: builder.mutation<ApiResponse<IOrder>, CreateOrderRequest>({
      query: (body) => ({
        url: "/order",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Order"],
    }),

    // return products with name and image for better UI display in order details page
    returnOrder: builder.mutation<
      ApiResponse<IOrder>,
      {
        returnId: string;
        product: string;
        price: number;
        selectedReasons: string[];
        shippingMethod: string;
        refundMethod: string;
        returnDate: string;
      }
    >({
      query: ({ returnId, ...body }) => ({
        url: `/order/${returnId}/return`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Order"],
    }),

    /* ================= GET ALL ORDERS ================= */
    getAllOrders: builder.query<any[], void>({
      query: () => "/orders",
      transformResponse: (res: ApiResponse<IOrder[]>) =>
        (res.data || []).map(formatOrder),

      providesTags: ["Order"],
      keepUnusedDataFor: 30,
    }),

    /* ================= GET SINGLE ORDER ================= */
    getOrderById: builder.query<any, string>({
      query: (id) => `/order/${id}`,
      transformResponse: (res: ApiResponse<IOrder>) => formatOrder(res.data),

      providesTags: ["Order"],
      keepUnusedDataFor: 30,
    }),

    /* ================= UPDATE ORDER STATUS ================= */
    updateOrderStatus: builder.mutation<
      ApiResponse<IOrder>,
      UpdateOrderStatusRequest
    >({
      query: ({ id, status }) => ({
        url: `/order/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Order"],
    }),

    /* ================= UPDATE PAYMENT STATUS ================= */
    updatePaymentStatus: builder.mutation<
      ApiResponse<IOrder>,
      UpdatePaymentStatusRequest
    >({
      query: ({ id, paymentStatus }) => ({
        url: `/order/${id}/payment`,
        method: "PATCH",
        body: { paymentStatus },
      }),
      invalidatesTags: ["Order"],
    }),

    /* ================= DELETE ORDER ================= */
    deleteOrder: builder.mutation<ApiResponse<{ message: string }>, string>({
      query: (id) => ({
        url: `/order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

/* =========================
   EXPORT HOOKS
========================= */

export const {
  useCreateOrderMutation,
  useReturnOrderMutation,
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
  useUpdatePaymentStatusMutation,
  useDeleteOrderMutation,
} = orderApi;
