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
      { games: GameCard[]; total: number; filteredTotal: number },
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
          const allApps = appList.applist.apps;

          // Сохраняем общее количество игр без фильтров
          const totalGames = allApps.length;

          // Получаем детали для всех игр
          const gameDetailsPromises = allApps.map(async app => {
            try {
              const detailsResponse = await fetchWithBQ(
                `http://localhost:3001/api/appdetails?appids=${app.appid}`
              );

              if (detailsResponse.error || !detailsResponse.data) {
                return null;
              }

              const detailsData = detailsResponse.data as GameResponse;
              const appDetails = detailsData[app.appid];

              if (appDetails && appDetails.success) {
                const gameData = appDetails.data;

                // Проверяем соответствие фильтрам
                if (arg.searchQuery) {
                  const query = arg.searchQuery.toLowerCase();
                  if (!gameData.name.toLowerCase().includes(query)) {
                    return null;
                  }
                }

                if (arg.priceRange) {
                  const price = gameData.is_free ? 0 : gameData.price_overview?.final || 0;
                  if (price < arg.priceRange[0] || price > arg.priceRange[1]) {
                    return null;
                  }
                }

                if (arg.genres && arg.genres.length > 0) {
                  const gameGenres = gameData.genres.map(genre => genre.description);
                  if (!arg.genres.some(genre => gameGenres.includes(genre))) {
                    return null;
                  }
                }

                if (arg.platforms && arg.platforms.length > 0) {
                  const hasSelectedPlatform = arg.platforms.some(platform =>
                    platform === 'windows'
                      ? gameData.platforms.windows
                      : platform === 'mac'
                        ? gameData.platforms.mac
                        : platform === 'linux'
                          ? gameData.platforms.linux
                          : false
                  );
                  if (!hasSelectedPlatform) {
                    return null;
                  }
                }

                if (arg.onlyDiscount) {
                  if (
                    !gameData.price_overview?.discount_percent ||
                    gameData.price_overview.discount_percent === 0
                  ) {
                    return null;
                  }
                }

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
          const filteredGameCards = gameCardsResults.filter(card => card !== null) as GameCard[];

          if (arg.sortBy) {
            switch (arg.sortBy) {
              case 'popular':
                // Логика сортировки по популярности
                break;
              case 'price_asc':
                filteredGameCards.sort((a, b) => (a.price.final || 0) - (b.price.final || 0));
                break;
              case 'price_desc':
                filteredGameCards.sort((a, b) => (b.price.final || 0) - (a.price.final || 0));
                break;
              case 'name':
                filteredGameCards.sort((a, b) => a.name.localeCompare(b.name));
                break;
              case 'release_date':
                // Логика сортировки по дате выхода
                break;
              default:
                break;
            }
          }

          const page = arg.page || 1;
          const limit = arg.limit || 12;
          const startIndex = (page - 1) * limit;
          const endIndex = startIndex + limit;
          const paginatedGameCards = filteredGameCards.slice(startIndex, endIndex);

          return {
            data: {
              games: paginatedGameCards,
              total: totalGames, // Общее количество игр для отображения
              filteredTotal: filteredGameCards.length, // Количество отфильтрованных игр для пагинации
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
