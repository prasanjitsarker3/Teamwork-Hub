/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../baseApi";

const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProject: builder.mutation({
      query: (formData: any) => ({
        url: "/project/create",
        method: "POST",
        contentType: "multipart/form-data",
        body: formData,
      }),
      invalidatesTags: ["project"],
    }),
    getAllProject: builder.query({
      query: () => ({
        url: "/project",
        method: "GET",
      }),
      providesTags: ["project"],
    }),

    getSingleProject: builder.query({
      query: (id: string) => ({
        url: `/project/${id}`,
        method: "GET",
      }),
      providesTags: ["project"],
    }),
    deleteProject: builder.mutation({
      query: (id: string) => ({
        url: `/project/delete/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["project"],
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useGetAllProjectQuery,
  useGetSingleProjectQuery,
  useDeleteProjectMutation,
} = projectApi;
