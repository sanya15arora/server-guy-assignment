import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { hostname } from "../config"

export const getItem = createAsyncThunk(
    'items/getItem',
    async (itemId) => {
        const response = await fetch(`${hostname}api/v1/items/${itemId}`)
            .then((res) => res.json());
        return response
    }
)

const itemSlice = createSlice({
    name: 'items',
    initialState: {
        itemData: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getItem.pending, (state) => {
                state.loading = true;
                state.itemData = null;
                state.error = null;
            })
            .addCase(getItem.fulfilled, (state, action) => {
                state.loading = false;
                state.itemData = action.payload;
                state.error = null;
            })
            .addCase(getItem.rejected, (state, action) => {
                console.log("action", action.error);
                state.loading = false;
                state.itemData = null;
                state.error = action.error
            })
    }
})

export default itemSlice.reducer;