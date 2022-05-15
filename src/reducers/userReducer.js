import { createReducer, createAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

const saveAuthTokens = createAction("userReducer/saveAuthToken");
const loadAuth = createAction("userReducer/loadAuth");
const resetAuth = createAction("userReducer/resetAuth");

const initState = {
    isReady: false,
    isAuthenticated: false,
    token: "",
    refreshToken: "",
}

const userReducer = createReducer(initState,(builder)=>{
    builder.addCase(loadAuth, (state, action)=>{
        const token = Cookies.get("auth.token");
        const refreshToken = Cookies.get("auth.refreshToken");
        if(token)state.token = token;
        if(refreshToken)state.refreshToken = refreshToken;
        state.isAuthenticated = state.token;
        state.isReady = true;
    });
    builder.addCase(saveAuthTokens, (state, action)=>{
        const refreshToken = jwt_decode(action.payload.refreshToken);
        const token = jwt_decode(action.payload.token);

        Cookies.set("auth.token", action.payload.token, {expires: dayjs.unix(token.exp).toDate()});
        Cookies.set("auth.refreshToken", action.payload.refreshToken, {expires: dayjs.unix(refreshToken.exp).toDate()});
        state.isAuthenticated = true;
        state.refreshToken = action.payload.refreshToken;
        state.token = action.payload.token;
    });
    builder.addCase(resetAuth, (state, action)=>{
        Object.assign(state, {...initState, isAuthenticated: false, isReady:true});
        Cookies.remove("auth.token");
        Cookies.remove("auth.refreshToken");
    });
});

export default userReducer;
export {saveAuthTokens, loadAuth, resetAuth}