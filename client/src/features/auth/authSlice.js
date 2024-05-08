import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: localStorage.getItem('user')|| null,
  token: localStorage.getItem("token")|| null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;

      localStorage.setItem("token", accessToken);
      localStorage.setItem('user',user)

      return { ...state, user, token:accessToken };
    },
    logOut: () => {
      localStorage.removeItem("token");
      localStorage.removeItem('user')
      return initialState;
    },
  },
});


export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
