import { FC, useState } from 'react';
import {
  Box,
  Typography,
  Slider,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Divider,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useMediaQuery,
  Theme,
  SelectChangeEvent,
  Button,
} from '@mui/material';
import {
  Search,
  ExpandMore,
  Computer,
  Apple,
  SportsEsports,
  FilterAltOff,
} from '@mui/icons-material';
import { GameFilters as GameFiltersType } from '../types/game.types';

interface GameFiltersProps {
  filters: GameFiltersType;
  onFilterChange: (filters: GameFiltersType) => void;
}

const GameFilters: FC<GameFiltersProps> = ({ filters, onFilterChange }) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [expanded, setExpanded] = useState<string | false>(!isMobile ? 'panel' : false);

  // Форматирование цены для отображения в слайдере
  const formatPrice = (value: number) => {
    return `${value} ₽`;
  };

  // Обработчики изменения фильтров
  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    onFilterChange({
      ...filters,
      priceRange: newValue as [number, number],
    });
  };

  const handleGenreChange = (genre: string) => {
    const newGenres = filters.genres.includes(genre)
      ? filters.genres.filter(g => g !== genre)
      : [...filters.genres, genre];

    onFilterChange({
      ...filters,
      genres: newGenres,
    });
  };

  const handlePlatformChange = (platform: string) => {
    const newPlatforms = filters.platforms.includes(platform)
      ? filters.platforms.filter(p => p !== platform)
      : [...filters.platforms, platform];

    onFilterChange({
      ...filters,
      platforms: newPlatforms,
    });
  };

  const handleDiscountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      onlyDiscount: event.target.checked,
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      searchQuery: event.target.value,
    });
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    onFilterChange({
      ...filters,
      sortBy: event.target.value as GameFiltersType['sortBy'],
    });
  };

  // Проверяем, есть ли активные фильтры
  const hasActiveFilters =
    filters.genres.length > 0 ||
    filters.platforms.length > 0 ||
    filters.searchQuery.trim() !== '' ||
    filters.onlyDiscount ||
    (filters.priceRange && (filters.priceRange[0] > 0 || filters.priceRange[1] < 7500));

  // Сброс всех фильтров
  const handleResetFilters = () => {
    onFilterChange({
      priceRange: [0, 7500],
      genres: [],
      platforms: [],
      searchQuery: '',
      onlyDiscount: false,
      sortBy: 'popular',
    });
  };

  // Список жанров для фильтрации
  const genresList = [
    'Action',
    'Adventure',
    'RPG',
    'Strategy',
    'Simulation',
    'Sports',
    'Racing',
    'FPS',
    'MMO',
    'Puzzle',
    'Horror',
    'Indie',
    'Free To Play',
  ];

  return (
    <Box
      sx={{
        mb: 3,
        // Предотвращаем смещение контента при открытии селектора
        position: 'relative',
        overflow: 'visible',
        width: '100%',
      }}
    >
      {/* Поисковая строка */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Искать в каталоге Game Store"
        value={filters.searchQuery}
        onChange={handleSearchChange}
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />

      {/* Сортировка */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="sort-label">Сортировка</InputLabel>
        <Select
          labelId="sort-label"
          value={filters.sortBy}
          label="Сортировка"
          onChange={handleSortChange}
          // Предотвращаем смещение контента и исчезновение скролла
          MenuProps={{
            // Отключаем блокировку скролла при открытии меню
            disableScrollLock: true,
            // Устанавливаем правильное позиционирование для меню
            PaperProps: {
              sx: {
                // Предотвращаем смещение контента
                position: 'absolute',
                // Обеспечиваем правильное отображение меню
                zIndex: 1300,
              },
            },
          }}
        >
          <MenuItem value="popular">Популярные</MenuItem>
          <MenuItem value="price_asc">Цена: по возрастанию</MenuItem>
          <MenuItem value="price_desc">Цена: по убыванию</MenuItem>
          <MenuItem value="name">По алфавиту</MenuItem>
          <MenuItem value="release_date">По дате выхода</MenuItem>
        </Select>
      </FormControl>

      {/* Кнопка сброса фильтров - показываем только если есть активные фильтры */}
      {hasActiveFilters && (
        <Button
          variant="outlined"
          onClick={handleResetFilters}
          startIcon={<FilterAltOff />}
          sx={{ mb: 2, width: '100%' }}
        >
          Сбросить все фильтры
        </Button>
      )}

      {/* Фильтры в аккордеоне для мобильных устройств */}
      <Accordion
        expanded={expanded !== false}
        onChange={() => setExpanded(expanded ? false : 'panel')}
        sx={{
          backgroundColor: 'background.paper',
          '&:before': {
            display: 'none',
          },
          // Предотвращаем смещение аккордеона при открытии селектора
          position: 'relative',
          overflow: 'visible',
          width: '100%',
        }}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">Фильтры</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* Цена */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Цена
            </Typography>
            <Box sx={{ px: 2 }}>
              <Slider
                value={filters.priceRange || [0, 7500]}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                valueLabelFormat={formatPrice}
                min={0}
                max={7500}
                step={100}
              />
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  от {filters.priceRange ? formatPrice(filters.priceRange[0]) : '0 ₽'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  до {filters.priceRange ? formatPrice(filters.priceRange[1]) : '7500 ₽'}
                </Typography>
              </Box>
            </Box>
            <FormControlLabel
              control={<Checkbox checked={filters.onlyDiscount} onChange={handleDiscountChange} />}
              label="Только со скидкой"
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Жанры */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Жанры
            </Typography>
            <FormGroup>
              {genresList.map(genre => (
                <FormControlLabel
                  key={genre}
                  control={
                    <Checkbox
                      checked={filters.genres.includes(genre)}
                      onChange={() => handleGenreChange(genre)}
                    />
                  }
                  label={genre}
                />
              ))}
            </FormGroup>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Платформы */}
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Платформы
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.platforms.includes('windows')}
                    onChange={() => handlePlatformChange('windows')}
                    icon={<Computer />}
                    checkedIcon={<Computer />}
                  />
                }
                label="Windows"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.platforms.includes('mac')}
                    onChange={() => handlePlatformChange('mac')}
                    icon={<Apple />}
                    checkedIcon={<Apple />}
                  />
                }
                label="macOS"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.platforms.includes('linux')}
                    onChange={() => handlePlatformChange('linux')}
                    icon={<SportsEsports />}
                    checkedIcon={<SportsEsports />}
                  />
                }
                label="Linux"
              />
            </FormGroup>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default GameFilters;
