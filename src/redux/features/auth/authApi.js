import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseURL";
import { setUser } from "./authSlice";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/auth`,
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: "/register",
        method: "POST",
        body: newUser,
        headers: {
          Accept: "application/json",
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // dispatch(setUser(data.user));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    loginUser: builder.mutation({
      query: (existUser) => ({
        url: "/login",
        method: "POST",
        body: existUser,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // dispatch(setUser(data.user));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
        } catch (error) {
          console.log(error);
        }
      },
    }),
    getUser: builder.query({
      query: () => ({
        url: "/me",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.user) {
            dispatch(setUser(data.user));
          }
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
      },
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/delete/${userId}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
        } catch (error) {
          console.log(error);
        }
      },
    }),
    updateUerRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `/update-role/${userId}`,
        method: "PATCH",
        body: { role },
      }),
      refetchOnMount: true,
      invalidatesTags: ["User"],
    }),
    editProfile: builder.mutation({
      query: (profileData) => ({
        url: `/edit-profile`,
        method: "PATCH",
        body: profileData,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserQuery,
  useDeleteUserMutation,
  useUpdateUerRoleMutation,
  useEditProfileMutation,
} = authApi;
export default authApi;



// logoutuser
// getuser
// deleteuser
