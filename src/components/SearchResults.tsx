import { FC } from 'react';
import { Box, Typography, List, ListItem, Paper, Divider } from '@mui/material';
import { GameCard as GameCardType } from '../types/game.types';
import { Link } from 'react-router-dom';

interface SearchResultsProps {
  results: GameCardType[];
  query: string;
  onClose?: () => void;
}

const SearchResults: FC<SearchResultsProps> = ({ results, query, onClose }) => {
  if (results.length === 0) {
    return null;
  }

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'absolute',
        width: '100%',
        maxHeight: '500px',
        overflowY: 'auto',
        zIndex: 1000,
        top: '100%',
        left: 0,
        mt: 1,
        borderRadius: 1,
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgba(0, 0, 0, 0.1)',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'linear-gradient(to bottom, #1976d2, #2196f3)',
          borderRadius: '4px',
          '&:hover': {
            background: 'linear-gradient(to bottom, #0d47a1, #1976d2)',
          },
        },
        scrollbarWidth: 'thin',
        scrollbarColor: '#1976d2 rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
        <Typography variant="subtitle1" gutterBottom>
          Найдены результаты по запросу: «{query}»
        </Typography>
      </Box>
      <Divider />

      <Box sx={{ p: 1, bgcolor: 'background.paper' }}>
        <Typography variant="subtitle2" sx={{ ml: 1, mb: 1, fontWeight: 'bold' }}>
          Игры
        </Typography>
        <List disablePadding>
          {results.map(game => (
            <ListItem
              key={game.appid}
              component={Link}
              to={`/game/${game.appid}`}
              onClick={onClose}
              sx={{
                display: 'flex',
                p: 1,
                textDecoration: 'none',
                color: 'inherit',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <Box
                component="img"
                src={game.header_image}
                alt={game.name}
                sx={{
                  width: 120,
                  height: 45,
                  objectFit: 'cover',
                  borderRadius: 1,
                  mr: 2,
                }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body2">{game.name}</Typography>
              </Box>
              <Box sx={{ textAlign: 'right', minWidth: 100 }}>
                {game.price.is_free ? (
                  <Typography variant="body2" color="success.main">
                    Бесплатно
                  </Typography>
                ) : (
                  <>
                    {game.price.discount_percent && game.price.discount_percent > 0 && (
                      <Typography
                        variant="body2"
                        component="span"
                        sx={{
                          bgcolor: 'error.main',
                          color: 'white',
                          px: 0.5,
                          py: 0.2,
                          borderRadius: 0.5,
                          mr: 1,
                          display: 'inline-block',
                        }}
                      >
                        -{game.price.discount_percent}%
                      </Typography>
                    )}
                    {game.price.discount_percent && game.price.discount_percent > 0 && (
                      <Typography
                        variant="body2"
                        component="span"
                        sx={{
                          textDecoration: 'line-through',
                          color: 'text.secondary',
                          mr: 1,
                          fontSize: '0.75rem',
                        }}
                      >
                        {game.price.initial && game.price.initial / 100} ₽
                      </Typography>
                    )}
                    <Typography variant="body2" component="span" sx={{ fontWeight: 'bold' }}>
                      {game.price.final && game.price.final / 100} ₽
                    </Typography>
                  </>
                )}
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default SearchResults;
