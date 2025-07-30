import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

// Async actions for loading, logging in, and logging out
export const loadToken = createAsyncThunk('auth/loadToken', async () => {
    const storedToken = await SecureStore.getItemAsync('token');
    return storedToken || null;
});

export const logIn = createAsyncThunk('auth/logIn',async(token)=>{
    await SecureStore.setItemAsync('token',token)
    return token;
})

export const logOut = createAsyncThunk('auth/logOut',async()=>{
    await SecureStore.deleteItemAsync('token')
    return null;
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        loading: true
    },
    reducers: {},
    extraReducers:(builder)=>{
        builder
        .addCase(loadToken.pending,(state)=>{
            state.loading = true
        })
        .addCase(loadToken.fulfilled,(state,action)=>{
            state.token = action.payload,
            state.loading = false
        })
        .addCase(loadToken.rejected,(state)=>{
            state.loading = false
        })
        .addCase(logIn.fulfilled,(state,action)=>{
            state.token = action.payload
            state.loading = false
        })
        .addCase(logOut.fulfilled,(state,action)=>{
            state.token = null,
            state.loading = false
        })
    }
})

export default authSlice.reducer