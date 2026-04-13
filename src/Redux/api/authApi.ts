import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    credentials: "include",
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    // Signup
    signupUser: builder.mutation<
      any,
      {
        name: string;
        email: string;
        password: string;
        role: "customer" | "seller" | "admin" | "both";
      }
    >({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        body,
      }),
    }),

    // Login
    loginUser: builder.mutation<any, { email: string; password: string }>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),

    // Logout
    logoutUser: builder.mutation<any, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    // Forgot Password
    forgotPassword: builder.mutation<any, { email: string }>({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),

    // Reset Password
    resetPassword: builder.mutation<
      {success: boolean; message: string },
      { email: string; otp: string; newPassword: string; confirmPassword: string  }
    >({
      query: ({ email, otp, newPassword, confirmPassword }) => ({
        url: "/auth/reset-password",
        method: "PUT",
        body: { email, otp, newPassword, confirmPassword },
      }),
    }),

    // Verify OTP
    verifyOtp: builder.mutation<
      { message: string },
      { email: string; otp: string }
    >({
      query: (body) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body,
      }),
    }),
    // Resend OTP
    resendOtp: builder.mutation<{ message: string }, { email: string }>({
      query: (body) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,

} = authApi;
