import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData: null,
    RefreshToken: "",
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
        setToken : (state,action)=>{
            state.RefreshToken = action.payload
        },
     }
})

export const {login, logout, setToken} = authSlice.actions;

export default authSlice.reducer;

