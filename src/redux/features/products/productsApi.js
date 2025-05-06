import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseURL";

const productsApi = createApi({
  reducerPath: "productsApi", // Fixed typo in reducerPath
  baseQuery: fetchBaseQuery({ baseUrl: `${getBaseUrl()}/api/` }),
  endpoints: (builder) => ({
    fetchAllProducts: builder.query({
      query: ({
        category,
        color,
        minPrice,
        maxPrice,
        limit,
        page,
        createdAt,
      }) => ({
        url: "products", // Now resolves to /api/products
        params: {
          category: category || undefined,
          color: color || undefined,
          minPrice: minPrice || undefined,
          maxPrice: maxPrice || undefined,
          limit,
          page,
          createdAt,
        },
      }),
    }),
    fetchProductById: builder.query({
      query: (id) => ({
        url: `products/${id}`,
        providesTags: (result, error, id) => [{ type: "products", id }],
      }),
    }),
    AddProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/create-product",
        method: "POST",
        body: newProduct,
        credentials: "include",
      }),
      invalidatesTags: ["Products"],
    }),
    fetchRelatedProducts: builder.query({
      query: (id) => `/related/${id}`,
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `update-product/${id}`,
        method: "PATCH",
        body: rest,
        credentials: "include",
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Products", id }],
    }),
  }),
});

export const {
  useFetchAllProductsQuery,
  useFetchProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useFetchRelatedProductsQuery
} = productsApi;

export default productsApi;
