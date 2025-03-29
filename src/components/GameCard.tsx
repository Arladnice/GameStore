import { FC } from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Chip,
    Stack,
} from '@mui/material';
import { GameCard as GameCardType } from '../types/game.types';
import { Computer, Apple, SportsEsports } from '@mui/icons-material';

interface GameCardProps {
    game: GameCardType;
}

const GameCard: FC<GameCardProps> = ({ game }) => {
    // Форматирование цены
    const formatPrice = (price: number) => {
        return `${Math.floor(price / 100)} ₽`;
    };

    // Компонент для отображения цены с учетом скидки
    const PriceDisplay = () => {
        if (game.price.is_free) {
            return (
                <Typography variant='h6' color='primary'>
                    Бесплатно
                </Typography>
            );
        }

        if (game.price.discount_percent && game.price.discount_percent > 0) {
            return (
                <Box display='flex' alignItems='center' gap={1}>
                    <Chip
                        label={`-${game.price.discount_percent}%`}
                        color='error'
                        size='small'
                        sx={{ fontWeight: 'bold', fontSize: '0.8rem' }}
                    />
                    <Box display='flex' flexDirection='column'>
                        <Typography
                            variant='caption'
                            sx={{
                                textDecoration: 'line-through',
                                color: 'text.secondary',
                                fontSize: '0.75rem',
                            }}
                        >
                            {game.price.initial &&
                                formatPrice(game.price.initial)}
                        </Typography>
                        <Typography
                            variant='h6'
                            color='primary'
                            sx={{ fontWeight: 'bold' }}
                        >
                            {game.price.final && formatPrice(game.price.final)}
                        </Typography>
                    </Box>
                </Box>
            );
        }

        return (
            <Typography
                variant='h6'
                color='primary'
                sx={{ fontWeight: 'bold' }}
            >
                {game.price.final && formatPrice(game.price.final)}
            </Typography>
        );
    };

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-5px)',
                },
            }}
            component={Link}
            to={`/game/${game.appid}`}
            style={{ textDecoration: 'none' }}
        >
            {/* Изображение игры */}
            <CardMedia
                component='img'
                height='150'
                image={game.header_image}
                alt={game.name}
                sx={{ objectFit: 'cover' }}
            />

            {/* Контент карточки */}
            <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Typography
                    gutterBottom
                    variant='h6'
                    component='div'
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        mb: 1,
                        fontWeight: 'bold',
                    }}
                >
                    {game.name}
                </Typography>

                {/* Жанры */}
                <Stack
                    direction='row'
                    spacing={0.5}
                    flexWrap='wrap'
                    gap={0.5}
                    sx={{ mb: 2, minHeight: '48px' }}
                >
                    {game.genres.slice(0, 3).map((genre) => (
                        <Chip
                            key={genre}
                            label={genre}
                            size='small'
                            sx={{
                                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                                color: 'primary.main',
                                fontSize: '0.7rem',
                            }}
                        />
                    ))}
                </Stack>

                {/* Платформы */}
                <Box display='flex' mb={2}>
                    {game.platforms.windows && (
                        <Computer
                            sx={{
                                color: 'text.secondary',
                                fontSize: '1.2rem',
                                mr: 1,
                            }}
                        />
                    )}
                    {game.platforms.mac && (
                        <Apple
                            sx={{
                                color: 'text.secondary',
                                fontSize: '1.2rem',
                                mr: 1,
                            }}
                        />
                    )}
                    {game.platforms.linux && (
                        <SportsEsports
                            sx={{ color: 'text.secondary', fontSize: '1.2rem' }}
                        />
                    )}
                </Box>

                {/* Цена и скидка */}
                <Box
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                >
                    <PriceDisplay />

                    {/* Рейтинг */}
                    {game.rating && (
                        <Chip
                            label={`${game.rating}`}
                            size='small'
                            sx={{
                                backgroundColor:
                                    game.rating >= 90
                                        ? 'success.dark'
                                        : game.rating >= 70
                                          ? 'warning.dark'
                                          : 'error.dark',
                                color: 'white',
                                fontWeight: 'bold',
                            }}
                        />
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default GameCard;
