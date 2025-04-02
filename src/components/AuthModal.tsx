import { FC, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  IconButton,
  TextField,
  Typography,
  Tabs,
  Tab,
  Divider,
  Link,
  Slide,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

// Создаем собственную анимацию для выезжания справа с увеличенной продолжительностью
const SlideTransition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return (
    <Slide
      direction="left"
      ref={ref}
      {...props}
      timeout={{ enter: 400, exit: 300 }} // Увеличиваем время анимации для более плавного эффекта
    />
  );
});

const AuthModal: FC<AuthModalProps> = ({ open, onClose }) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={SlideTransition}
      keepMounted
      fullScreen // Устанавливаем полноэкранный режим для мобильных устройств
      disableScrollLock={true}
      sx={{
        '& .MuiDialog-container': {
          justifyContent: 'flex-end',
          alignItems: 'stretch',
          height: '100vh', // Явно указываем высоту контейнера
        },
        '& .MuiDialog-paper': {
          width: '100%',
          maxWidth: '400px',
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          color: 'white',
          margin: 0,
          minHeight: '100vh', // Минимальная высота 100vh вместо height: 100%
          borderRadius: 0,
          boxShadow: '-4px 0px 10px rgba(0, 0, 0, 0.2)',
          position: 'fixed', // Фиксированное позиционирование
          right: 0, // Прижимаем к правому краю
          top: 0, // Прижимаем к верхнему краю
          bottom: 0, // Прижимаем к нижнему краю
          maxHeight: 'none', // Отменяем ограничение по максимальной высоте
        },
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <Box sx={{ p: 3, overflowY: 'auto', height: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
              }}
            >
              Game Store
            </Typography>
          </Box>
          <IconButton
            onClick={onClose}
            sx={{ color: 'white', position: 'absolute', right: 10, top: 10 }}
          >
            <Close />
          </IconButton>
        </Box>

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            mb: 3,
            '& .MuiTabs-indicator': { backgroundColor: 'primary.main' },
            '& .MuiTab-root': { color: 'white', fontWeight: 'bold' },
            '& .Mui-selected': { color: 'white !important' },
          }}
          centered
        >
          <Tab label="Вход" />
          <Tab label="Регистрация" />
        </Tabs>

        {tabValue === 0 && (
          <Box>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Email
            </Typography>
            <TextField
              fullWidth
              placeholder="Email"
              variant="outlined"
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
              }}
            />

            <Typography variant="body2" sx={{ mb: 1 }}>
              Пароль
            </Typography>
            <TextField
              fullWidth
              placeholder="Пароль"
              type="password"
              variant="outlined"
              sx={{
                mb: 1,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
              }}
            />

            <Link
              href="#"
              underline="always"
              sx={{ color: 'primary.main', display: 'block', mb: 3, fontSize: '0.875rem' }}
            >
              Забыли пароль?
            </Link>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ py: 1.5, borderRadius: 1, mb: 3 }}
            >
              Войти
            </Button>

            <Box sx={{ textAlign: 'center', position: 'relative', mb: 3 }}>
              <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
              <Typography
                variant="body2"
                sx={{
                  position: 'absolute',
                  top: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: 'rgba(0, 0, 0, 0.85)',
                  px: 2,
                }}
              >
                или
              </Typography>
            </Box>

            <Button
              fullWidth
              variant="outlined"
              sx={{
                py: 1.5,
                backgroundColor: '#4A76A8',
                color: 'white',
                mb: 2,
                borderColor: '#4A76A8',
                '&:hover': {
                  borderColor: '#4A76A8',
                  backgroundColor: 'rgba(74, 118, 168, 0.8)',
                },
              }}
              startIcon={<Typography sx={{ fontWeight: 'bold' }}>VK</Typography>}
            >
              Войти через VK ID
            </Button>

            <Button
              fullWidth
              variant="outlined"
              sx={{
                py: 1.5,
                backgroundColor: 'white',
                color: 'black',
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                },
              }}
              startIcon={<GoogleIcon />}
            >
              Войти через Google
            </Button>

            <Typography
              variant="caption"
              align="center"
              sx={{ display: 'block', mt: 3, color: 'rgba(255, 255, 255, 0.6)' }}
            >
              Авторизуясь через социальные сети,
              <br />
              вы соглашаетесь с{' '}
              <Link href="#" sx={{ color: 'primary.main' }}>
                правилами пользования сайтом
              </Link>
              <br />и с{' '}
              <Link href="#" sx={{ color: 'primary.main' }}>
                политикой обработки персональных данных
              </Link>
            </Typography>
          </Box>
        )}

        {tabValue === 1 && (
          <Box>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Email
            </Typography>
            <TextField
              fullWidth
              placeholder="Email"
              variant="outlined"
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
              }}
            />

            <Typography variant="body2" sx={{ mb: 1 }}>
              Пароль
            </Typography>
            <TextField
              fullWidth
              placeholder="Пароль"
              type="password"
              variant="outlined"
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
              }}
            />

            <Typography variant="body2" sx={{ mb: 1 }}>
              Повторите пароль
            </Typography>
            <TextField
              fullWidth
              placeholder="Повторите пароль"
              type="password"
              variant="outlined"
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
              }}
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ py: 1.5, borderRadius: 1, mb: 3 }}
            >
              Регистрация
            </Button>

            <Typography
              variant="caption"
              align="center"
              sx={{ display: 'block', mt: 3, color: 'rgba(255, 255, 255, 0.6)' }}
            >
              Регистрируясь на сайте,
              <br />
              вы соглашаетесь с{' '}
              <Link href="#" sx={{ color: 'primary.main' }}>
                правилами пользования сайтом
              </Link>
              <br />и с{' '}
              <Link href="#" sx={{ color: 'primary.main' }}>
                политикой обработки персональных данных
              </Link>
            </Typography>
          </Box>
        )}
      </Box>
    </Dialog>
  );
};

export default AuthModal;
