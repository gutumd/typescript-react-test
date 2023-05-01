import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ServerResponse, Data, Comic } from "../../models/models";

const apiPath: string = "https://gateway.marvel.com/v1/public/";
const apiKey: string = "cf00878ad2c41a8b719517aeb83f0394";

export const marvelApi = createApi({
  reducerPath: "marvel/api",
  baseQuery: fetchBaseQuery({
    baseUrl: apiPath,
  }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    getComics: build.query<Comic[], any>({
      query: () => ({
        url: "comics",
        params: {
          apikey: apiKey,
          limit: 15,
        },
      }),
      transformResponse: (response: ServerResponse<Data>) =>
        response.data.results,
    }),
    searchComics: build.query<Comic[], string>({
      query: (search: string) => ({
        url: "comics",
        params: {
          title: search,
          apikey: apiKey,
          limit: 15,
        },
      }),
      transformResponse: (response: ServerResponse<Data>) =>
        response.data.results,
    }),
    getSingleComic: build.query<Comic[], number>({
      query: (comicId: number) => ({
        url: `comics/${comicId}`,
        params: {
          apikey: apiKey,
          limit: 15,
        },
      }),
      transformResponse: (response: ServerResponse<Data>) =>
        response.data.results,
    }),
  }),
});

export const {
  useGetComicsQuery,
  useSearchComicsQuery,
  useLazyGetSingleComicQuery,
} = marvelApi;
