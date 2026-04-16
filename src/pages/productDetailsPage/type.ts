/* =========================
   PRODUCT IN ORDER
========================= */

export interface OrderProduct {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

/* =========================
   SHIPPING ADDRESS
========================= */

export interface ShippingAddress {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  postalCode?: string;
  country: string;
}

/* =========================
   CREATE ORDER REQUEST
========================= */

export interface CreateOrderRequest {
  products: OrderProduct[];
  totalAmount: number;
  shippingAddress: ShippingAddress;
  billingAddress?: BillingAddress;
}

/* =========================
   ORDER RESPONSE (FROM BACKEND)
========================= */

export interface OrderResponse {
  success?: boolean;
  message?: string;
  data: {
    _id: string;
    orderId: string;
    userId?: string;
    products?: OrderProduct[];
    totalAmount?: number;
    status?: "pending" | "processing" | "completed" | "cancelled";
    paymentStatus?: "unpaid" | "paid";
    transactionId?: string | null;
    shippingAddress?: ShippingAddress;
    createdAt?: string;
    updatedAt?: string;
  };
}

/* =========================
   CHECKOUT SESSION RESPONSE
========================= */

export interface CheckoutResponse {
  url: string;
  sessionId?: string;
}

/* =========================
   CREATE CHECKOUT REQUEST
========================= */

export interface CreateCheckoutRequest {
  orderId: string;
  totalAmount: number;
}
export interface BillingAddress {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  postalCode?: string;
  country: string;
}