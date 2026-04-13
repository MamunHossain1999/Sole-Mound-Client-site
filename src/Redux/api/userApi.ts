import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api", // আপনার সার্ভার URL
    credentials: "include", // cookie পাঠানোর জন্য
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    // Get Profile
    getProfile: builder.query<any, void>({
      query: () => "/user/profile",
      providesTags: ["User"],
    }),
    // all users for admin
    getAllUsers: builder.query<any, void>({
      query: () => "/all/users/users",
      providesTags: ["User"],
    }),
    // Update Profile
    updateProfile: builder.mutation<
      any,
      {
        name?: string;
        email?: string;
        password?: string;
        location?: string;
        bio?: string;
        skills?: string;
      }
    >({
      query: (body) => ({
        url: "/update-profile",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    // Delete User (Admin)
    deleteUser: builder.mutation<any, string>({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    // Update User Role (Admin)
    updateUserRole: builder.mutation<
      any,
      { id: string; role: "user" | "admin" }
    >({
      query: ({ id, role }) => ({
        url: `/user/${id}/role`,
        method: "PUT",
        body: { role },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useUpdateProfileMutation,
  useGetProfileQuery,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
} = userApi;
