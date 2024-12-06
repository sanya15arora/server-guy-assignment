import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { hostname } from "../config"

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (userCredentials) => {
        const response = await fetch(`${hostname}api/v1/users/${userCredentials.username}`)
            .then((res) => res.json());
        localStorage.setItem("user", JSON.stringify(response));
        return response
    }
)

export const getUserById = createAsyncThunk(
    'user/getUserById',
    async (id) => {
        const response = await fetch(`${hostname}api/v1/users/${id}`)
            .then((res) => res.json());
        return response
    }
)


const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user: null,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.error.message
            })
            .addCase(getUserById.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(getUserById.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.error.message
            })
    }
})

export default userSlice.reducer;