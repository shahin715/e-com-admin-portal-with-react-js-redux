import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../baseApi";
import reducers from "../combineReducers";

export const store = configureStore({
    reducer: reducers(),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});
