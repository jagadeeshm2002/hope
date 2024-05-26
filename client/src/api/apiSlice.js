import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://hopestore-server.vercel.app/',
    credentials: 'include',
    
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
            headers.set("Content-Type", "application/json");
        }
        
        return headers;
    }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    

    if (result?.error?.status === 401) {
        console.log('Sending refresh token');

        // Send refresh token to get new access token
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
        

        if (refreshResult?.data && refreshResult.data.accessToken) {
            const user = api.getState().auth.user;
            const userId = api.getState().auth.userId;

            // Store the new token
            api.dispatch(setCredentials({ ...refreshResult.data, user, token: refreshResult.data.accessToken, userId }));

            // Retry the original query with the new access token
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logOut());
        }
    }

    return result; // Move the return statement inside the function
};

export const apislice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
});
