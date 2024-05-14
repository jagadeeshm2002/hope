import { apislice } from "../../api/apiSlice";
const productApi = apislice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (query) => ({ url: "/products", method: "GET", body: query }),
    }),
    getProduct: builder.query({
      query: (query) => ({
        url: "/products/:id",
        method: "GET",
        body: query,
      }),
    }),
  }),
});

export const {useGetProductsQuery,useGetProductQuery}=productApi;