import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null },
    reducers: {
        setCredentials: function (state, action) {
            const { user, accessToken } = action.payload;
            state.user = user;
            state.token = accessToken;
        },
        logOut: function (state, action) {
            state.user = null;
            state.token = null;
        },
    },
})

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;
const selectCurrentUser = (state) => state.auth.user;
const selectCurrentToken = (state) => state.auth.token;

export { authActions, authReducer, selectCurrentUser, selectCurrentToken };