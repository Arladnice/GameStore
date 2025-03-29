import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  TextField,
  InputAdornment,
  Badge,
  Container,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Search,
  ShoppingCart,
  Favorite,
  Menu as MenuIcon,
  Close,
  Login,
  Apps as CatalogIcon,
  AccountCircle,
} from '@mui/icons-material';
import { useState } from 'react';

const Header: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Обработчики меню
  const handleMobileMenuOpen = () => {
    setMobileMenuOpen(true);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  return (
    <AppBar position="sticky" color="default" elevation={0}>
      <Container maxWidth={false}>
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Логотип */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isMobile && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleMobileMenuOpen}
                sx={{ mr: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Typography
              variant="h5"
              component={RouterLink}
              to="/"
              sx={{
                fontWeight: 700,
                textDecoration: 'none',
                color: 'primary.main',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Game Store
            </Typography>

            {!isMobile && (
              <>
                <Button
                  component={RouterLink}
                  to="/catalog"
                  startIcon={<CatalogIcon />}
                  sx={{ ml: 2 }}
                >
                  Каталог
                </Button>

                <Button color="inherit" sx={{ ml: 1 }}>
                  Пополни Steam
                </Button>
              </>
            )}
          </Box>

          {/* Поиск на десктопе */}
          {!isMobile && (
            <Box sx={{ flexGrow: 1, mx: 4, maxWidth: 600 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Поиск"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          )}

          {/* Иконки справа */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {!isMobile && (
              <>
                <IconButton color="inherit">
                  <Badge badgeContent={3} color="primary">
                    <Favorite />
                  </Badge>
                </IconButton>
                <IconButton color="inherit" sx={{ ml: 1 }}>
                  <Badge badgeContent={2} color="primary">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              </>
            )}

            <Button
              variant="contained"
              color="primary"
              startIcon={<Login />}
              size={isMobile ? 'small' : 'medium'}
              sx={{ ml: isMobile ? 1 : 2 }}
            >
              {isMobile ? 'Войти' : 'Войти в аккаунт'}
            </Button>
          </Box>
        </Toolbar>
      </Container>

      {/* Мобильное меню */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={handleMobileMenuClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: '80%',
            maxWidth: 300,
            backgroundColor: 'background.paper',
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
            Game Store
          </Typography>
          <IconButton color="inherit" onClick={handleMobileMenuClose}>
            <Close />
          </IconButton>
        </Box>

        <Divider />

        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Поиск"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
        </Box>

        <List>
          <ListItem button component={RouterLink} to="/catalog" onClick={handleMobileMenuClose}>
            <CatalogIcon sx={{ mr: 2 }} />
            <ListItemText primary="Каталог" />
          </ListItem>

          <ListItem button onClick={handleMobileMenuClose}>
            <IconButton size="small" sx={{ mr: 1, p: 0 }}>
              <Favorite />
            </IconButton>
            <ListItemText primary="Избранное" />
          </ListItem>

          <ListItem button onClick={handleMobileMenuClose}>
            <IconButton size="small" sx={{ mr: 1, p: 0 }}>
              <ShoppingCart />
            </IconButton>
            <ListItemText primary="Корзина" />
          </ListItem>

          <Divider sx={{ my: 1 }} />

          <ListItem button onClick={handleMobileMenuClose}>
            <IconButton size="small" sx={{ mr: 1, p: 0 }}>
              <AccountCircle />
            </IconButton>
            <ListItemText primary="Войти в аккаунт" />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;
