import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user") || null,
  userId: localStorage.getItem("userId") || null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: localStorage.getItem("token") ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken, userId } = action.payload;

      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", user);
      localStorage.setItem("userId", userId);

      return {
        ...state,
        user,
        token: accessToken,
        isAuthenticated: true,
        userId: userId,
      };
    },
    logOut: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userId");

      return initialState;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export const checkAuthentication = () => (dispatch, getState) => {
  const { token } = getState().auth;

  if (token) {
    dispatch(
      setCredentials({
        user: localStorage.getItem("user"),
        userId: localStorage.getItem("userId"),
        accessToken: token,
      })
    );
  } else {
    dispatch(logOut());
  }
};

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUserId = (state) => state.auth.userId;
