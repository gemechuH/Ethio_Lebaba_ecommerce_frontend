import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getBaseUrl } from "../../../utils/baseURL"


const statsApi = createApi({
  reducerPath: "statsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/stats`,
    credentials: "include",
  }),
    tagTypes: ["Stats"],
    endpoints: (builder) => ({
        getUserStats: builder.query({
            query: (email) => `/user/${email}`,
            providesTags: ["Stats"],
        }),
        getAdminStats: builder.query({
            query: () => `/admin-stats`,
            providesTags: ["Stats"],
        })
        
  })
});
export const { useGetAdminStatsQuery, useGetUserStatsQuery } = statsApi
   export default statsApi
