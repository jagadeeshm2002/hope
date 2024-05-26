import { apislice } from "../../api/apiSlice";

const cartApiSlice = apislice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: (userid) => ({
        url: `/cart`,
        method: "GET",
        params: { userid },
      }),
    }),
    addToCart: builder.mutation({
      query: ({ userId, cart }) => ({
        url: `/cart/add`,
        method: "POST",
        body: { userId, cart },
      }),
    }),
    removeFromCart: builder.mutation({
      query: ({ userId, productId }) => ({
        url: `/cart/remove/${userId}`,
        method: "POST",
        body: { userId, productId },
      }),
    }),
  }),
});

export const { useGetCartQuery, useAddToCartMutation, useRemoveFromCartMutation } = cartApiSlice;
