import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GameResponse, GameCard, GameFilters } from '../types/game.types';

// Вспомогательные интерфейсы для Steam API
interface SteamAppListResponse {
  applist: {
    apps: Array<{
      appid: number;
      name: string;
    }>;
  };
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    prepareHeaders: headers => {
      // Добавляем CORS заголовки при необходимости
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: builder => ({
    // Получение детальной информации об игре по ID
    getGameDetails: builder.query<GameResponse, string>({
      // Используем прокси через локальный сервер для обхода CORS
      query: appId => `http://localhost:3001/api/appdetails?appids=${appId}`,
    }),

    // Получение списка всех игр (с кэшированием)
    getGamesList: builder.query<SteamAppListResponse, void>({
      query: () => ({
        url: 'http://localhost:3001/api/steamapps/getapplist/v2',
        method: 'GET',
      }),
    }),

    // Получение игр с фильтрацией и пагинацией
    getGames: builder.query<
      { games: GameCard[]; total: number },
      Partial<GameFilters> & { page?: number; limit?: number }
    >({
      async queryFn(arg, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          // Получаем список всех игр
          const appListResponse = await fetchWithBQ(
            'http://localhost:3001/api/steamapps/getapplist/v2'
          );

          if (appListResponse.error) {
            return { error: appListResponse.error };
          }

          const appList = appListResponse.data as SteamAppListResponse;

          // Получаем все игры
          const allApps = appList.applist.apps;

          // Фиксированное общее количество игр (это важно для корректной пагинации)
          const totalGames = allApps.length;

          // Фильтруем игры по поисковому запросу, если указан
          let filteredApps = allApps;
          if (arg.searchQuery) {
            const query = arg.searchQuery.toLowerCase();
            filteredApps = filteredApps.filter(app => app.name.toLowerCase().includes(query));
          }

          // Параметры пагинации
          const page = arg.page || 1;
          const limit = arg.limit || 20;

          // Определяем диапазон игр для текущей страницы
          const startIndex = (page - 1) * limit;
          const endIndex = startIndex + limit;

          // Получаем игры только для текущей страницы
          const pageApps = filteredApps.slice(startIndex, endIndex);

          // Получаем детали только для игр текущей страницы
          const gameDetailsPromises = pageApps.map(async app => {
            try {
              const detailsResponse = await fetchWithBQ(
                `http://localhost:3001/api/appdetails?appids=${app.appid}`
              );

              if (detailsResponse.error || !detailsResponse.data) {
                return null;
              }

              const detailsData = detailsResponse.data as GameResponse;
              const appDetails = detailsData[app.appid];

              // Если детали успешно получены, создаем карточку игры
              if (appDetails && appDetails.success) {
                const gameData = appDetails.data;

                // Проверяем, соответствует ли игра выбранным фильтрам
                // Тут можно добавить логику применения остальных фильтров

                // Создаем объект карточки игры
                const gameCard: GameCard = {
                  appid: app.appid,
                  name: gameData.name,
                  header_image: gameData.header_image,
                  price: gameData.is_free
                    ? { is_free: true }
                    : gameData.price_overview
                      ? {
                          initial: gameData.price_overview.initial,
                          final: gameData.price_overview.final,
                          discount_percent: gameData.price_overview.discount_percent,
                        }
                      : { is_free: false },
                  genres: gameData.genres.map(genre => genre.description),
                  platforms: gameData.platforms,
                  // Здесь можно добавить логику для рейтинга, если он доступен
                  rating: gameData.recommendations?.total
                    ? Math.min(100, Math.round((gameData.recommendations.total / 1000) * 10))
                    : undefined,
                };

                return gameCard;
              }

              return null;
            } catch (error) {
              console.error('Error fetching game details:', error);
              return null;
            }
          });

          const gameCardsResults = await Promise.all(gameDetailsPromises);
          const gameCards = gameCardsResults.filter(card => card !== null) as GameCard[];

          // Убеждаемся, что у нас достаточно игр для отображения
          // Если нет, можно было бы запросить еще
          const finalGameCards = gameCards.slice(0, limit);

          return {
            data: {
              games: finalGameCards,
              // Используем фиксированное значение total для стабильной пагинации
              total: totalGames,
            },
          };
        } catch (error) {
          console.error('Error in getGames query:', error);
          return { error: { status: 'CUSTOM_ERROR', error: String(error) } };
        }
      },
    }),
  }),
});

export const { useGetGameDetailsQuery, useGetGamesQuery, useGetGamesListQuery } = api;
