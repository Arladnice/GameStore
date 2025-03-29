import { FC, useState } from 'react';
import { Container, Grid, Typography, Box, Skeleton, Pagination } from '@mui/material';
import GameCard from '../components/GameCard';
import GameFilters from '../components/GameFilters';
import { useGetGamesQuery } from '../services/api';
import { GameFilters as GameFiltersType } from '../types/game.types';

const Catalog: FC = () => {
  // Начальные значения фильтров
  const initialFilters: GameFiltersType = {
    priceRange: [0, 7500],
    genres: [],
    platforms: [],
    searchQuery: '',
    onlyDiscount: false,
    sortBy: 'popular',
  };

  // Состояние фильтров
  const [filters, setFilters] = useState<GameFiltersType>(initialFilters);
  const [page, setPage] = useState(1);
  const gamesPerPage = 20;

  // Получение данных из API
  const { data, isLoading, error } = useGetGamesQuery({ ...filters, page, limit: gamesPerPage });

  // Обработчик изменения фильтров
  const handleFilterChange = (newFilters: GameFiltersType) => {
    setFilters(newFilters);
    setPage(1); // Сбрасываем страницу при изменении фильтров
  };

  // Обработчик изменения страницы
  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Вычисление общего числа страниц
  const totalPages = data?.total ? Math.ceil(data.total / gamesPerPage) : 0;

  // Отображаемые игры на текущей странице
  const displayedGames = data?.games || [];

  return (
    <Container maxWidth={false}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ mb: 4, mt: 1, fontWeight: 'bold' }}
      >
        Каталог игр
        {data?.total && (
          <Typography variant="subtitle1" component="span" sx={{ ml: 2, color: 'text.secondary' }}>
            {data.total} игр
          </Typography>
        )}
      </Typography>

      <Grid container spacing={4}>
        {/* Фильтры (боковая панель) */}
        <Grid item xs={12} md={3}>
          <GameFilters filters={filters} onFilterChange={handleFilterChange} />
        </Grid>

        {/* Список игр */}
        <Grid item xs={12} md={9}>
          {isLoading ? (
            // Скелетон при загрузке
            <Grid container spacing={2}>
              {Array.from(new Array(8)).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Skeleton variant="rectangular" height={150} sx={{ mb: 1 }} />
                  <Skeleton width="80%" height={30} sx={{ mb: 1 }} />
                  <Skeleton width="60%" height={24} sx={{ mb: 1 }} />
                  <Skeleton width="40%" height={24} />
                </Grid>
              ))}
            </Grid>
          ) : error ? (
            // Сообщение об ошибке
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" color="error">
                Произошла ошибка при загрузке данных
              </Typography>
              <Typography variant="body1">
                Пожалуйста, попробуйте обновить страницу или попробуйте позже
              </Typography>
            </Box>
          ) : displayedGames.length > 0 ? (
            // Карточки игр
            <>
              <Grid container spacing={2}>
                {displayedGames.map(game => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={game.appid}>
                    <GameCard game={game} />
                  </Grid>
                ))}
              </Grid>

              {/* Пагинация */}
              {totalPages > 1 && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 4,
                    mb: 4
                  }}
                >
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                    showFirstButton
                    showLastButton
                  />
                </Box>
              )}
            </>
          ) : (
            // Если нет результатов
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6">Игры не найдены</Typography>
              <Typography variant="body1" color="text.secondary">
                Попробуйте изменить параметры фильтрации
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Catalog;
