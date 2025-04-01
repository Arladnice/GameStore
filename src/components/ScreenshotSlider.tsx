import { FC, useState, useEffect } from 'react';
import { Box, IconButton, Modal, Typography, CircularProgress } from '@mui/material';
import { Close, ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

interface ScreenshotSliderProps {
  open: boolean;
  onClose: () => void;
  screenshots: string[];
  initialIndex?: number;
  gameName: string;
}

const ScreenshotSlider: FC<ScreenshotSliderProps> = ({
  open,
  onClose,
  screenshots,
  initialIndex = 0,
  gameName,
}) => {
  // Инициализируем currentIndex сразу с initialIndex, чтобы избежать показа первого скриншота
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLoading, setIsLoading] = useState(true);

  // Обновляем текущий индекс при изменении initialIndex или при открытии слайдера
  useEffect(() => {
    if (open) {
      setCurrentIndex(initialIndex);
      // Сбрасываем состояние загрузки при открытии слайдера с новым индексом
      setIsLoading(true);
    }
  }, [initialIndex, open]);

  // Обработчики для навигации по скриншотам
  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoading(true);
    setCurrentIndex(prev => (prev === screenshots.length - 1 ? 0 : prev + 1));
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoading(true);
    setCurrentIndex(prev => (prev === 0 ? screenshots.length - 1 : prev - 1));
  };

  // Функция для обработки загрузки изображения
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  // Функция для обработки ошибки загрузки изображения
  const handleImageError = () => {
    setIsLoading(false);
    console.error(`Ошибка загрузки изображения: ${screenshots[currentIndex]}`);
    // Продолжаем показывать изображение даже при ошибке загрузки
    // чтобы пользователь мог переключиться на другие скриншоты
  };

  // Предзагрузка изображений
  useEffect(() => {
    if (open && screenshots && screenshots.length > 0) {
      // Предзагрузка текущего, следующего и предыдущего изображений
      const preloadImages = () => {
        const imagesToPreload = [];

        // Проверяем валидность URL перед добавлением в массив предзагрузки
        const isValidUrl = (url: unknown): boolean => typeof url === 'string' && url.trim() !== '';

        // Текущее изображение
        if (isValidUrl(screenshots[currentIndex])) {
          imagesToPreload.push(screenshots[currentIndex]);
        }

        // Следующее изображение
        const nextIndex = currentIndex === screenshots.length - 1 ? 0 : currentIndex + 1;
        if (isValidUrl(screenshots[nextIndex])) {
          imagesToPreload.push(screenshots[nextIndex]);
        }

        // Предыдущее изображение
        const prevIndex = currentIndex === 0 ? screenshots.length - 1 : currentIndex - 1;
        if (isValidUrl(screenshots[prevIndex])) {
          imagesToPreload.push(screenshots[prevIndex]);
        }

        // Создаем и загружаем изображения с обработкой ошибок
        imagesToPreload.forEach(src => {
          if (src) {
            const img = new Image();
            img.onerror = () => {
              // Обрабатываем ошибку загрузки при предзагрузке
              console.error(`Ошибка загрузки изображения: ${src}`);
            };
            img.src = src;
          }
        });
      };

      preloadImages();
    }
  }, [open, currentIndex, screenshots]);

  // Если нет скриншотов или они некорректны, не показываем слайдер
  if (
    !screenshots ||
    screenshots.length === 0 ||
    !screenshots.every(url => typeof url === 'string' && url.trim() !== '')
  ) {
    return null;
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="screenshots-modal"
      aria-describedby="game-screenshots-viewer"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '90%',
          height: '90%',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          outline: 'none',
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            color: 'white',
            zIndex: 10,
          }}
        >
          <Close />
        </IconButton>

        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isLoading && (
              <Box
                sx={{
                  position: 'absolute',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CircularProgress size={60} sx={{ color: 'white' }} />
              </Box>
            )}
            <Box
              component="img"
              key={`screenshot-${currentIndex}`} // Добавляем ключ для пересоздания компонента при смене индекса
              src={screenshots[currentIndex] || ''}
              alt={`${gameName} screenshot ${currentIndex + 1}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              sx={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                opacity: isLoading ? 0.3 : 1,
                transition: 'opacity 0.3s ease-in-out',
              }}
            />
          </Box>

          <IconButton
            onClick={handlePrevImage}
            sx={{
              position: 'absolute',
              left: 16,
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              },
            }}
          >
            <ArrowBackIos />
          </IconButton>

          <IconButton
            onClick={handleNextImage}
            sx={{
              position: 'absolute',
              right: 16,
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              },
            }}
          >
            <ArrowForwardIos />
          </IconButton>
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: 'white',
            position: 'absolute',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '4px 12px',
            borderRadius: '16px',
          }}
        >
          {`${currentIndex + 1} / ${screenshots.length}`}
        </Typography>
      </Box>
    </Modal>
  );
};

export default ScreenshotSlider;
