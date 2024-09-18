import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: sessionStorage.getItem("user") || null,
  userId: sessionStorage.getItem("userId") || null,
  token: sessionStorage.getItem("token") || null,
  isAuthenticated: sessionStorage.getItem("token") ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken, userId } = action.payload;

      sessionStorage.setItem("token", accessToken);
      sessionStorage.setItem("user", user);
      sessionStorage.setItem("userId", userId);

      return {
        ...state,
        user,
        token: accessToken,
        isAuthenticated: true,
        userId: userId,
      };
    },
    signOut: () => {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("userId");

      return initialState;
    },
  },
});

export const { setCredentials, signOut } = authSlice.actions;

export const checkAuthentication = () => (dispatch, getState) => {
  const { token } = getState().auth;

  if (token) {
    dispatch(
      setCredentials({
        user: sessionStorage.getItem("user"),
        userId: sessionStorage.getItem("userId"),
        accessToken: token,
      })
    );
  } else {
    dispatch(signOut());
  }
};

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUserId = (state) => state.auth.userId;
