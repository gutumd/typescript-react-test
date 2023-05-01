import { configureStore } from "@reduxjs/toolkit";
import { marvelApi } from "./marvel/marvel.api";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { marvelAppReducer } from "./marvel/marvel.slice";

export const store = configureStore({
  reducer: {
    [marvelApi.reducerPath]: marvelApi.reducer,
    marvelApp: marvelAppReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(marvelApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
