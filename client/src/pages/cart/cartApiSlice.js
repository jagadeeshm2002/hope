import { apislice } from "../../api/apiSlice";

const cartApiSlice = apislice.injectEndpoints({
    endpoints: (builder) => ({
        getCart: builder.query({
            query: (userid) => ({
                url: `/cart`,
                method: "GET",
                params: {userid},
            }),
        }),
        addToCart: builder.mutation({
            query: (data) => ({
                url: `/cart/add`,
                method: "POST",
                body: data,
            }),
        })
    }),
})


export const{useGetCartQuery, useAddToCartMutation} = cartApiSlice
