import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as mappers from './mapper';


const TYPE = 'news';
export const News_API_REDUCER = 'newsAPI';
export const newsAPI = createApi({
  reducerPath: News_API_REDUCER,
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  tagTypes: [TYPE],
  endpoints: builder => ({
    getNewsListCategory: builder.query< any, any >({
      query: (data) => {
        return {
          url: `https://newsapi.org/v2/top-headlines?country=us&apiKey=c74efd52dd574e61a680d1f6fa0b35f3&pageSize=10`,
          method: 'GET',
        };
      },
      transformResponse: mappers.RTKGetNewsAPIMapper,
      providesTags: [TYPE],
    }),
    getNewsSearch: builder.query< any, any >({
      query: (params) => {
        return {
          url: `https://newsapi.org/v2/everything?apiKey=c74efd52dd574e61a680d1f6fa0b35f3`,
          method: 'GET',
          params: params,
        };
      },
      transformResponse: mappers.RTKGetNewsAPIMapper,
      providesTags: [TYPE],
    }),
    getNewsAPIList: builder.query< any, any >({
      query: (params) => {
        return {
          url: `https://newsapi.org/v2/top-headlines?country=us&apiKey=c74efd52dd574e61a680d1f6fa0b35f3&pageSize=10`,
          method: 'GET',
          params: params,
        };
      },
      transformResponse: mappers.RTKGetNewsAPIMapper,
      providesTags: [TYPE],
    }),  
    getGuardianNews: builder.query< any, any >({
      query: (params) => {
        return {
          url:`https://content.guardianapis.com/search?api-key=2b526cee-85cf-4eeb-aaba-2785e9263e64`,
          method: 'GET',
          params: params
        };
      },
      transformResponse: mappers.RTKGetGuardianMapper,
      providesTags: [TYPE],
    }),
    getNytimesNews: builder.query< any, any >({
      query: (params) => {
        return {
          url:`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=4ZCFFGS85FG8DVJlcp4ouTXk7CSWP785`,
          method: 'GET',
          params: params,
        };
      },
      transformResponse: mappers.RTKGetNYtimesMapper,
      providesTags: [TYPE],
    }),
    }),
});

export const {
  useGetNewsAPIListQuery,
  useGetGuardianNewsQuery,
  useGetNytimesNewsQuery,
  useGetNewsSearchQuery,
  useGetNewsListCategoryQuery,
} = newsAPI;
