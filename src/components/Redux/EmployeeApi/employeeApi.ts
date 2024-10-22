/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../baseApi";

const employeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addNewTeamMember: builder.mutation({
      query: (data: any) => ({
        url: "/employee/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["team"],
    }),
    getAllEmployee: builder.query({
      query: (arg: any) => ({
        url: "/employee",
        method: "GET",
        params: arg,
      }),
      providesTags: ["user"],
    }),
    getSingleEmployee: builder.query({
      query: (id: string) => ({
        url: `/employee/${id}`,
        method: "GET",
      }),
      providesTags: ["employee", "user", "team"],
    }),
  }),
});

export const {
  useGetAllEmployeeQuery,
  useAddNewTeamMemberMutation,
  useGetSingleEmployeeQuery,
} = employeeApi;
