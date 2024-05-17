import { apislice } from "../../api/apiSlice";
const productApi = apislice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ category, page }) => {
        return {
          url: `/products`,
          params: { category, page,limit:20 },
          method: "GET",
        };
      },
    }),
    getProduct: builder.query({
      query: (slug) => ({
        url: `/products/${slug}`,
        method: "GET",
        retry: 3, // Retry failed requests up to 3 times
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff with max delay of 30 seconds
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productApi;
