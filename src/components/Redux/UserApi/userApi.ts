/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userProfileData: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getAllProfileData: builder.query({
      query: (arg: any) => ({
        url: "/user/get-profile",
        method: "GET",
        params: arg,
      }),
      providesTags: ["user"],
    }),
    createUser: builder.mutation({
      query: (data: any) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    singleUserProfileData: builder.query({
      query: (id: string) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    singleUserStatusRoleUpdate: builder.mutation({
      query: ({ id, updateData }: { id: string; updateData: any }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        body: updateData,
      }),
      invalidatesTags: ["user"],
    }),
    deleteUser: builder.mutation({
      query: (id: string) => ({
        url: `/user/delete/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useUserProfileDataQuery,
  useGetAllProfileDataQuery,
  useCreateUserMutation,
  useSingleUserProfileDataQuery,
  useSingleUserStatusRoleUpdateMutation,
  useDeleteUserMutation,
} = userApi;
