import { configureStore } from "@reduxjs/toolkit";
import userReducer from './UserSlice'
import searchReducer from './SearchSlice'
import itemReducer from './ItemSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        search: searchReducer,
        items: itemReducer
    }
})

export default store