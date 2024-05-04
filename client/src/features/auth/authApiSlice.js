import { apislice } from "../../api/apiSlice";

export const authApiSlice = apislice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: credentials => ({
        url:'/auth',
        method:'POST',
        body:{...credentials},
        
      }),
    }),
  }),
});

export const {useLoginMutation}=authApiSlice