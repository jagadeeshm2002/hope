
import { apislice } from "../../api/apiSlice";

const userApi = apislice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (userId) => ({ url: `/users`, params: { userId }, method: "GET" }),
    }),
    updateUser: builder.mutation({
      query: ({ userId, name, phoneNumber }) => ({
        url: "/users/edit",
        method: "PUT",
        body: { userId: userId, name, phoneNumber },
      }),
    }),
    getAddresses: builder.query({
      query: (userId) => ({
        url: `/users/address/${userId}`,
        method: "GET",
      }),
    }),
    getSingleAddress: builder.query({
      query: ({ userId, addressId }) => ({
        url: `/users/address/${userId}/${addressId}`,
        method: "GET",
      }),
    }),
    addAddress: builder.mutation({
      query: ({
        userId,
        address,
        city,
        state,
        country,
        pinCode,
        isDefault,
      }) => ({
        url: `/users/address/${userId}`,
        method: "POST",
        body: { address, city, state, country, pinCode, isDefault },
      }),
    }),
    editAddress: builder.mutation({
      query: ({
        userId,
        addressId,
        address,
        city,
        state,
        country,
        pinCode,
        isDefault,
      }) => ({
        url: `/users/address/${userId}/${addressId}`,
        method: "PUT",
        body: { address, city, state, country, pinCode, isDefault },
      }),
    }),
    deleteAddress: builder.mutation({
      query: ({ userId, addressId }) => ({
        url: `/users/address/${userId}/${addressId}`,
        method: "DELETE",
      }),
    }),
    getFavourites: builder.query({
      query: (userId) => ({
        url: `/users/favourites/${userId}`,
        method: "GET",
      }),
    }),
    addFavourites: builder.mutation({
      query: ({ userId, product }) => ({
        url: `/users/favourites/${userId}`,
        method: "POST",
        body: { product },
      }),
    }),
    deleteFavourite: builder.mutation({
      query: ({ userId, productId }) => ({
        url: `/users/favourites/${userId}`,
        method: "DELETE",
        body: { productId },
      })
    })
  }),
});

export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useGetAddressesQuery,
  useAddAddressMutation,
  useGetSingleAddressQuery,
  useEditAddressMutation,
  useDeleteAddressMutation,
  useAddFavouritesMutation,
  useGetFavouritesQuery,
  useDeleteFavouriteMutation,
} = userApi;
