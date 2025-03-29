import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GameCard, GameFilters } from '../types/game.types';

// Моковый API для каталога, пока не согласован реальный эндпоинт
export const mockApi = createApi({
  reducerPath: 'mockApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: builder => ({
    getGames: builder.query<{ games: GameCard[]; total: number }, Partial<GameFilters>>({
      queryFn: () => {
        // Имитируем данные для каталога
        const mockGames: GameCard[] = [
          {
            appid: 730,
            name: 'Counter-Strike 2',
            header_image:
              'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/header.jpg',
            price: {
              is_free: true,
            },
            genres: ['Action', 'Free to Play', 'FPS'],
            platforms: {
              windows: true,
              mac: false,
              linux: true,
            },
            rating: 95,
          },
          {
            appid: 570,
            name: 'Dota 2',
            header_image: 'https://cdn.akamai.steamstatic.com/steam/apps/570/header.jpg',
            price: {
              is_free: true,
            },
            genres: ['MOBA', 'Free to Play', 'Strategy'],
            platforms: {
              windows: true,
              mac: true,
              linux: true,
            },
            rating: 92,
          },
          {
            appid: 271590,
            name: 'Grand Theft Auto V',
            header_image: 'https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg',
            price: {
              initial: 1999,
              final: 699,
              discount_percent: 65,
            },
            genres: ['Action', 'Adventure', 'Open World'],
            platforms: {
              windows: true,
              mac: false,
              linux: false,
            },
            rating: 89,
          },
          {
            appid: 1174180,
            name: 'Red Dead Redemption 2',
            header_image: 'https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg',
            price: {
              initial: 2499,
              final: 1249,
              discount_percent: 50,
            },
            genres: ['Action', 'Adventure', 'Open World', 'Western'],
            platforms: {
              windows: true,
              mac: false,
              linux: false,
            },
            rating: 96,
          },
          {
            appid: 1172380,
            name: 'Metro Exodus - Gold Edition',
            header_image: 'https://cdn.akamai.steamstatic.com/steam/apps/1172380/header.jpg',
            price: {
              initial: 2999,
              final: 499,
              discount_percent: 83,
            },
            genres: ['Action', 'FPS', 'Survival', 'Post-apocalyptic'],
            platforms: {
              windows: true,
              mac: true,
              linux: true,
            },
            rating: 95,
          },
        ];

        return {
          data: {
            games: mockGames,
            total: mockGames.length,
          },
        };
      },
    }),
  }),
});

export const { useGetGamesQuery } = mockApi;
