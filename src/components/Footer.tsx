import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Telegram, YouTube, Gamepad, Instagram, Twitter } from '@mui/icons-material';

const Footer: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        mt: 'auto',
        backgroundColor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={4}>
          {/* Логотип и ссылки */}
          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                fontWeight: 700,
                textDecoration: 'none',
                color: 'primary.main',
                display: 'block',
                mb: 2,
              }}
            >
              Game Store
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <IconButton color="primary" size="small">
                <Telegram />
              </IconButton>
              <IconButton color="primary" size="small">
                <YouTube />
              </IconButton>
              <IconButton color="primary" size="small">
                <Instagram />
              </IconButton>
              <IconButton color="primary" size="small">
                <Twitter />
              </IconButton>
              <IconButton color="primary" size="small">
                <Gamepad />
              </IconButton>
            </Box>
          </Grid>

          {/* Ссылки */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
              Магазин
            </Typography>
            <Box component="ul" sx={{ pl: 0, listStyle: 'none', m: 0 }}>
              <Box component="li" sx={{ mb: 1 }}>
                <Link component={RouterLink} to="/catalog" color="inherit" underline="hover">
                  Каталог
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link component={RouterLink} to="/new" color="inherit" underline="hover">
                  Новинки
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link component={RouterLink} to="/sales" color="inherit" underline="hover">
                  Скидки
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link component={RouterLink} to="/preorders" color="inherit" underline="hover">
                  Предзаказы
                </Link>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
              Покупателям
            </Typography>
            <Box component="ul" sx={{ pl: 0, listStyle: 'none', m: 0 }}>
              <Box component="li" sx={{ mb: 1 }}>
                <Link component={RouterLink} to="/how-to-buy" color="inherit" underline="hover">
                  Как купить
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link component={RouterLink} to="/payment" color="inherit" underline="hover">
                  Способы оплаты
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link component={RouterLink} to="/warranty" color="inherit" underline="hover">
                  Гарантия
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link component={RouterLink} to="/faq" color="inherit" underline="hover">
                  Вопросы и ответы
                </Link>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
              Информация
            </Typography>
            <Box component="ul" sx={{ pl: 0, listStyle: 'none', m: 0 }}>
              <Box component="li" sx={{ mb: 1 }}>
                <Link component={RouterLink} to="/about" color="inherit" underline="hover">
                  О компании
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link component={RouterLink} to="/contacts" color="inherit" underline="hover">
                  Контакты
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link component={RouterLink} to="/terms" color="inherit" underline="hover">
                  Пользовательское соглашение
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link component={RouterLink} to="/privacy" color="inherit" underline="hover">
                  Политика конфиденциальности
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'center' : 'flex-start',
          }}
        >
          <Typography variant="body2" color="text.secondary" sx={{ mb: isMobile ? 2 : 0 }}>
            © 2024 — 2025 Game Store. Все права защищены.
          </Typography>
          <Typography variant="body2" color="text.secondary" align={isMobile ? 'center' : 'right'}>
            Все названия продуктов, логотипы и бренды являются собственностью соответствующих
            владельцев.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
