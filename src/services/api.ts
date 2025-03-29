import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GameResponse } from '../types/game.types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/' }),
  endpoints: builder => ({
    getGameDetails: builder.query<GameResponse, string>({
      query: appId => `appdetails?appids=${appId}`,
    }),
  }),
});

export const { useGetGameDetailsQuery } = api;
