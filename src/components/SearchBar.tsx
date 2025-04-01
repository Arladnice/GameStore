import { FC, useState, useEffect, useRef } from 'react';
import { InputBase, Paper, IconButton, Box, ClickAwayListener } from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import { useGetGamesQuery } from '../services/api';
import SearchResults from './SearchResults';
import { GameCard } from '../types/game.types';

const SearchBar: FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<GameCard[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Получаем данные о играх через API
  const { data } = useGetGamesQuery({
    searchQuery,
    limit: 10, // Ограничиваем количество результатов
  });

  // Обновляем результаты поиска при изменении данных
  useEffect(() => {
    if (data && searchQuery.trim().length > 0) {
      setSearchResults(data.games);
    } else {
      setSearchResults([]);
    }
  }, [data, searchQuery]);

  // Обработчик изменения поискового запроса
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Обработчик очистки поискового запроса
  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  // Обработчик потери фокуса
  const handleClickAway = () => {
    setIsSearchFocused(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ position: 'relative', width: '100%', maxWidth: 500 }} ref={searchRef}>
        <Paper
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            px: 2,
            borderRadius: 5,
            bgcolor: 'rgba(255, 255, 255, 0.15)',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.25)',
            },
          }}
        >
          <IconButton sx={{ p: '10px', color: 'white' }} aria-label="search">
            <Search />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1, color: 'white' }}
            placeholder="Искать в Game Store"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setIsSearchFocused(true)}
            inputProps={{ 'aria-label': 'search games' }}
          />
          {searchQuery && (
            <IconButton
              sx={{ p: '10px', color: 'white' }}
              aria-label="clear"
              onClick={handleClearSearch}
            >
              <Clear />
            </IconButton>
          )}
        </Paper>

        {/* Результаты поиска */}
        {isSearchFocused && searchQuery.trim().length > 0 && (
          <SearchResults
            results={searchResults}
            query={searchQuery}
            onClose={() => setIsSearchFocused(false)}
          />
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default SearchBar;
