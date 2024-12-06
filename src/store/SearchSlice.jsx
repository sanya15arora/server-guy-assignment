import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { hostname } from "../config"

export const defaultSearch = createAsyncThunk(
    'search/defaultSearch',
    async (params) => {
        const { page, tags, numericFilters, query } = params?.searchParams
        const response = await fetch(`${hostname}api/v1/${params?.searchParams?.sortBy === "byDate" ? "search_by_date" : "search"}?`
            + new URLSearchParams({
                page: page - 1 || 0,
                tags: tags || 'story',
                ...(query ? { query: query } : null),
                ...(numericFilters ? { numericFilters: numericFilters } : null)
            }).toString())
            .then((res) => res.json());
        return response
    }
)

const initialState = {
    searchData: [],
    currentPage: 1,
    loading: false,
    error: null,
    searchParams: {
        page: 1,
        query: '',
        tags: "story",
        sortBy: "byPopularity",
        numericFilters: '',
    }
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.searchParams = {
                ...state.searchParams,
                page: action.payload
            }
            state.currentPage = action.payload;

        },
        updateSearchParams: (state, action) => {
            state.searchParams = {
                ...state.searchParams,
                ...action.payload,
            };
        },
        updateQuery: (state, action) => {
            state.searchParams = {
                ...state.searchParams,
                query: action.payload,
                page: 1
            };
            state.currentPage = 1;
        },

        resetSearch: (state) => {
            state.searchData = [];
            state.currentPage = 1;
            state.searchParams = initialState.searchParams;
            state.error = null;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(defaultSearch.pending, (state) => {
                state.loading = true;
                state.searchData = [];
                state.error = null;
            })
            .addCase(defaultSearch.fulfilled, (state, action) => {
                state.loading = false;
                state.searchData = action.payload;
                // state.currentPage = action.payload.page;
                state.error = null;
            })
            .addCase(defaultSearch.rejected, (state, action) => {
                state.loading = false;
                state.searchData = [];
                state.error = action.error.message || 'Search failed';
            })
    }
})


export const {
    setCurrentPage,
    updateSearchParams,
    updateQuery,
    resetSearch
} = searchSlice.actions;

export default searchSlice.reducer;