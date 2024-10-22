/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../baseApi";

const teamApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createNewTeam: builder.mutation({
      query: (formData: any) => ({
        url: "/team/create",
        method: "POST",
        contentType: "multipart/form-data",
        body: formData,
      }),
      invalidatesTags: ["team"],
    }),
    userProfileData: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getAllTeamData: builder.query({
      query: (arg: any) => ({
        url: "/team",
        method: "GET",
        params: arg,
      }),
      providesTags: ["user"],
    }),
    getAllTeamLead: builder.query({
      query: () => ({
        url: "/team/lead",
        method: "GET",
      }),
      providesTags: ["team"],
    }),
    getTeamLeadOwnData: builder.query({
      query: () => ({
        url: "/team/my-team",
        method: "GET",
      }),
      providesTags: ["team"],
    }),
    getTeamLeadUnderAllEmployee: builder.query({
      query: () => ({
        url: "/employee/underEmployee",
        method: "GET",
      }),
      providesTags: ["team", "employee"],
    }),
  }),
});

export const {
  useGetAllTeamDataQuery,
  useGetAllTeamLeadQuery,
  useCreateNewTeamMutation,
  useGetTeamLeadOwnDataQuery,
  useGetTeamLeadUnderAllEmployeeQuery,
} = teamApi;
