import { FC, useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Chip,
  Skeleton,
  Divider,
  Avatar,
  Rating,
  TextField,
  Tab,
  Tabs,
  Paper,
  List,
  ListItem,
  styled,
} from '@mui/material';
import { ShoppingCart, Computer, Apple, SportsEsports, Favorite, Send } from '@mui/icons-material';
import { useGetGameDetailsQuery } from '../services/api';

// Стилизованный контейнер для видео
const VideoContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  maxWidth: '1600px',
  margin: '0 auto',
  height: '70vh',
  overflow: 'hidden',
  marginBottom: '16px',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '30%',
    background: `linear-gradient(to top, ${theme.palette.background.default}, transparent)`,
    pointerEvents: 'none',
    zIndex: 1,
  },
}));

// Видео плеер
const VideoPlayer = styled('video')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

// Компонент для табов с информацией
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`game-tabpanel-${index}`}
      aria-labelledby={`game-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const GameDetails: FC = () => {
  const { id } = useParams<{ id: string }>();

  // RTK Query для получения данных
  const { data, isLoading, error } = useGetGameDetailsQuery(id || '');

  // Состояние для табов
  const [tabValue, setTabValue] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Обработчик изменения таба
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Извлекаем данные игры из ответа API
  const gameData = data?.[id || '']?.data;

  // Получаем первый трейлер из списка фильмов
  const trailer = gameData?.movies?.find(movie => movie.highlight);

  // Автоматически воспроизводить видео при наличии трейлера
  useEffect(() => {
    if (trailer && videoRef.current) {
      videoRef.current.play().catch(err => console.error('Ошибка автозапуска видео:', err));
    }
  }, [trailer]);

  // Форматирование цены
  const formatPrice = (price: number) => {
    return `${Math.floor(price / 100)} ₽`;
  };

  // Получаем жанры
  const genres = gameData?.genres?.map(genre => genre.description) || [];

  // Список системных требований
  const requirements = [
    { label: 'ОС', value: 'Windows 10 64-bit' },
    {
      label: 'Процессор',
      value: 'Intel Core i5-8400 или AMD Ryzen 5 1600',
    },
    { label: 'Оперативная память', value: '8 ГБ' },
    {
      label: 'Видеокарта',
      value: 'NVIDIA GeForce GTX 1060 6GB или AMD RX 580 8GB',
    },
    { label: 'Место на диске', value: '70 ГБ' },
  ];

  // Мокап для отзывов и комментариев
  const reviews = [
    {
      id: 1,
      author: 'неСокрушимый_мастер',
      avatar: 'https://i.pravatar.cc/100?img=1',
      date: '13 марта в 08:41',
      rating: 2,
      text: 'Купил, установил, системные требования не подошли, хотя ПК нормальный, очень стало обидно',
      likes: 0,
      dislikes: 0,
    },
    {
      id: 2,
      author: 'Game Store',
      avatar: 'https://i.pravatar.cc/100?img=2',
      date: '13 марта в 13:15',
      isSupport: true,
      text: 'неСокрушимый_мастер, Здравствуйте, опишите, пожалуйста, подробнее, с какими трудностями вы столкнулись? Поищем варианты решения возникших проблем',
      likes: 0,
      dislikes: 0,
    },
    {
      id: 3,
      author: 'тыквенные_семечки',
      avatar: 'https://i.pravatar.cc/100?img=3',
      date: '02 марта в 20:45',
      rating: 5,
      text: 'Здравия желаю! А будут ли отдельно продаваться DLC для этого шедевра?',
      likes: 1,
      dislikes: 0,
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', pb: 8 }}>
      {isLoading ? (
        // Скелетон при загрузке
        <>
          <Box sx={{ width: '100%', position: 'relative' }}>
            <VideoContainer>
              <Skeleton variant="rectangular" width="100%" height="100%" animation="wave" />
            </VideoContainer>
          </Box>
          <Container maxWidth={false} sx={{ py: 4, maxWidth: '1600px', mx: 'auto' }}>
            <Skeleton variant="text" width="50%" height={60} sx={{ mb: 2 }} />
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Skeleton variant="text" width="90%" height={30} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="100%" height={120} sx={{ mb: 2 }} />
                <Skeleton variant="text" width="80%" height={30} sx={{ mb: 1 }} />
                <Skeleton variant="rectangular" width="100%" height={200} />
              </Grid>
              <Grid item xs={12} md={4}>
                <Skeleton variant="rectangular" width="100%" height={300} />
              </Grid>
            </Grid>
          </Container>
        </>
      ) : error ? (
        // Сообщение об ошибке
        <Container maxWidth={false} sx={{ py: 4, textAlign: 'center' }}>
          <Typography variant="h4" color="error" sx={{ mb: 2 }}>
            Произошла ошибка при загрузке данных
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Не удалось загрузить информацию об игре. Пожалуйста, попробуйте позже.
          </Typography>
          <Button component={Link} to="/catalog" variant="contained" color="primary">
            Вернуться в каталог
          </Button>
        </Container>
      ) : gameData ? (
        <>
          {/* Видео-баннер или большой скриншот */}
          <Box sx={{ width: '100%', position: 'relative' }}>
            <VideoContainer>
              {trailer ? (
                // Видео
                <VideoPlayer ref={videoRef} controls autoPlay loop muted>
                  <source src={trailer.mp4.max} type="video/mp4" />
                  Ваш браузер не поддерживает видео.
                </VideoPlayer>
              ) : (
                // Если видео нет, показываем скриншот
                <Box
                  sx={{
                    height: '100%',
                    backgroundImage: `url(${gameData.screenshots?.[0]?.path_full || gameData.header_image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              )}
            </VideoContainer>
          </Box>

          {/* Основная информация */}
          <Container maxWidth={false} sx={{ py: 4, maxWidth: '1600px', mx: 'auto' }}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              {gameData.name}
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                {/* Табы с информацией */}
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    mb: 2,
                  }}
                >
                  <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                  >
                    <Tab label="Описание" />
                    <Tab label="Активация" />
                    <Tab label="Системные требования" />
                  </Tabs>
                </Box>

                {/* Панель описания */}
                <TabPanel value={tabValue} index={0}>
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: gameData.detailed_description,
                      }}
                    />
                  </Typography>

                  {/* Скриншоты */}
                  <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>
                    Скриншоты
                  </Typography>
                  <Grid container spacing={1}>
                    {gameData.screenshots?.slice(0, 6).map(screenshot => (
                      <Grid item xs={6} md={4} key={screenshot.id}>
                        <Box
                          component="img"
                          src={screenshot.path_thumbnail}
                          alt={`Скриншот ${screenshot.id}`}
                          sx={{
                            width: '100%',
                            height: 150,
                            objectFit: 'cover',
                            borderRadius: 1,
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </TabPanel>

                {/* Панель активации */}
                <TabPanel value={tabValue} index={1}>
                  <Typography variant="h6" gutterBottom>
                    Как активировать игру?
                  </Typography>
                  <Typography variant="body1" paragraph>
                    1. Перейдите в клиент Steam и войдите в свой аккаунт.
                  </Typography>
                  <Typography variant="body1" paragraph>
                    2. Нажмите "Игры" в верхнем меню, затем выберите "Активировать продукт в
                    Steam...".
                  </Typography>
                  <Typography variant="body1" paragraph>
                    3. Следуйте инструкциям и введите ключ активации.
                  </Typography>
                  <Typography variant="body1" paragraph>
                    4. После активации игра появится в вашей библиотеке Steam и будет доступна для
                    установки.
                  </Typography>
                </TabPanel>

                {/* Панель системных требований */}
                <TabPanel value={tabValue} index={2}>
                  <Typography variant="h6" gutterBottom>
                    Минимальные системные требования
                  </Typography>
                  <List>
                    {requirements.map((req, index) => (
                      <ListItem key={index} divider>
                        <Grid container>
                          <Grid item xs={4} md={3}>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                fontWeight: 'bold',
                              }}
                            >
                              {req.label}
                            </Typography>
                          </Grid>
                          <Grid item xs={8} md={9}>
                            <Typography variant="body2">{req.value}</Typography>
                          </Grid>
                        </Grid>
                      </ListItem>
                    ))}
                  </List>
                </TabPanel>
              </Grid>

              {/* Боковая панель с информацией */}
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3, mb: 3 }}>
                  {/* Цена и кнопка покупки */}
                  <Box sx={{ mb: 3 }}>
                    <Box display="flex" alignItems="center" mb={2}>
                      {/* Скидка */}
                      {gameData.price_overview?.discount_percent &&
                        gameData.price_overview?.discount_percent > 0 && (
                          <Chip
                            label={`-${gameData.price_overview?.discount_percent}%`}
                            color="error"
                            size="small"
                            sx={{
                              mr: 2,
                              fontWeight: 'bold',
                            }}
                          />
                        )}

                      {/* Цена */}
                      <Box>
                        {gameData.price_overview?.discount_percent &&
                          gameData.price_overview?.discount_percent > 0 && (
                            <Typography
                              variant="body2"
                              sx={{
                                textDecoration: 'line-through',
                                color: 'text.secondary',
                              }}
                            >
                              {formatPrice(gameData.price_overview?.initial || 0)}
                            </Typography>
                          )}

                        {gameData.is_free ? (
                          <Typography
                            variant="h5"
                            color="primary"
                            sx={{
                              fontWeight: 'bold',
                            }}
                          >
                            Бесплатно
                          </Typography>
                        ) : (
                          <Typography
                            variant="h5"
                            color="primary"
                            sx={{
                              fontWeight: 'bold',
                            }}
                          >
                            {gameData.price_overview
                              ? formatPrice(gameData.price_overview?.final)
                              : 'Цена не указана'}
                          </Typography>
                        )}
                      </Box>
                    </Box>

                    {/* Кнопка покупки */}
                    <Button
                      variant="contained"
                      startIcon={<ShoppingCart />}
                      size="large"
                      fullWidth
                      sx={{ mb: 1 }}
                    >
                      Купить
                    </Button>

                    {/* Кнопка добавления в избранное */}
                    <Button variant="outlined" startIcon={<Favorite />} size="large" fullWidth>
                      В избранное
                    </Button>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  {/* Информация о игре */}
                  <Typography variant="h6" gutterBottom>
                    Описание
                  </Typography>

                  {/* Жанры */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Жанр:
                    </Typography>
                    <Box display="flex" flexWrap="wrap" gap={0.5}>
                      {genres.map(genre => (
                        <Chip
                          key={genre}
                          label={genre}
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(99, 102, 241, 0.1)',
                            color: 'primary.main',
                          }}
                        />
                      ))}
                    </Box>
                  </Box>

                  {/* Локализация */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Локализация:
                    </Typography>
                    <Typography variant="body2">
                      {gameData.supported_languages.includes('Russian')
                        ? 'Полностью на русском языке'
                        : 'Отсутствует русский язык'}
                    </Typography>
                  </Box>

                  {/* Платформы */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Платформа:
                    </Typography>
                    <Box display="flex" gap={1}>
                      {gameData.platforms.windows && (
                        <Chip icon={<Computer />} label="PC" size="small" />
                      )}
                      {gameData.platforms.mac && (
                        <Chip icon={<Apple />} label="MacOS" size="small" />
                      )}
                      {gameData.platforms.linux && (
                        <Chip icon={<SportsEsports />} label="Linux" size="small" />
                      )}
                    </Box>
                  </Box>

                  {/* Издатель */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Издатель:
                    </Typography>
                    <Typography variant="body2">
                      {gameData.publishers?.join(', ') || 'Не указан'}
                    </Typography>
                  </Box>

                  {/* Разработчик */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Разработчик:
                    </Typography>
                    <Typography variant="body2">
                      {gameData.developers?.join(', ') || 'Не указан'}
                    </Typography>
                  </Box>

                  {/* Дата выхода */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Дата выхода:
                    </Typography>
                    <Typography variant="body2">
                      {gameData.release_date?.date || 'Не указана'}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>

            {/* Секция комментариев и отзывов */}
            <Box sx={{ mt: 5 }}>
              <Typography variant="h4" sx={{ mb: 3 }}>
                Отзывы и комментарии
              </Typography>

              {/* Рейтинг */}
              <Paper sx={{ p: 3, mb: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3}>
                    <Box textAlign="center">
                      <Typography variant="h2" color="primary" sx={{ fontWeight: 'bold' }}>
                        95
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary">
                        727 оценок
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <Typography variant="h6" gutterBottom>
                      Рейтинг игры
                    </Typography>
                    <Box display="flex" justifyContent="center" flexWrap="wrap" gap={2}>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => (
                        <Chip
                          key={value}
                          label={value}
                          variant={value === 10 ? 'filled' : 'outlined'}
                          color={value === 10 ? 'primary' : 'default'}
                          sx={{ minWidth: 40 }}
                        />
                      ))}
                    </Box>
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                      <Button variant="contained" color="primary" sx={{ mt: 1 }}>
                        Написать отзыв
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>

              {/* Комментарии */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Typography variant="h6" component="span" sx={{ mr: 2 }}>
                    96 комментариев
                  </Typography>
                  <Typography variant="h6" component="span" color="text.secondary">
                    88 отзывов
                  </Typography>
                </Box>

                {/* Форма добавления комментария */}
                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    placeholder="Написать комментарий..."
                    multiline
                    rows={3}
                    sx={{ mb: 1 }}
                  />
                  <Box display="flex" justifyContent="flex-end">
                    <Button variant="contained" endIcon={<Send />}>
                      Отправить
                    </Button>
                  </Box>
                </Box>

                {/* Список комментариев */}
                <List>
                  {reviews.map(review => (
                    <Paper key={review.id} sx={{ mb: 2, p: 2 }}>
                      <Box display="flex" alignItems="flex-start">
                        <Avatar src={review.avatar} alt={review.author} sx={{ mr: 2 }} />
                        <Box sx={{ width: '100%' }}>
                          <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                            <Typography
                              variant="subtitle1"
                              sx={{
                                fontWeight: 'bold',
                                mr: 1,
                              }}
                            >
                              {review.author}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {review.date}
                            </Typography>
                            {review.isSupport && (
                              <Chip label="Support" size="small" color="primary" sx={{ ml: 1 }} />
                            )}
                          </Box>
                          {review.rating && (
                            <Rating value={review.rating} readOnly size="small" sx={{ mb: 1 }} />
                          )}
                          <Typography variant="body2" paragraph>
                            {review.text}
                          </Typography>
                          <Box display="flex" gap={2}>
                            <Button variant="text" size="small" startIcon={<Favorite />}>
                              {review.likes}
                            </Button>
                            <Button variant="text" size="small">
                              Ответить
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    </Paper>
                  ))}
                </List>
              </Box>
            </Box>
          </Container>
        </>
      ) : (
        <Container maxWidth={false} sx={{ py: 4, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Игра не найдена
          </Typography>
          <Button component={Link} to="/catalog" variant="contained" color="primary">
            Вернуться в каталог
          </Button>
        </Container>
      )}
    </Box>
  );
};

export default GameDetails;
