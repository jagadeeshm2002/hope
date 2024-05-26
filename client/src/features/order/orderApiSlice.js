import { apislice } from "../../api/apiSlice";

const orderApi = apislice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (userId) => ({
        url: `/orders/${userId}`,
        method: "GET",
      }),
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: `/orders`,
        method: "POST",
        body: data,
      }),
    }),
    getSingleOrder: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "GET",
      }),
    }),
    cancelOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/cancel/${id}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const { useGetOrdersQuery, useCreateOrderMutation, useGetSingleOrderQuery, useCancelOrderMutation } = orderApi;