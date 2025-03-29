import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

// Импорт компонентов страниц
import Catalog from './pages/Catalog';
import GameDetails from './pages/GameDetails';
import Header from './components/Header';
import Footer from './components/Footer';

// Импорт API
import { api } from './services/api';
import { mockApi } from './services/mockApi';

// Импорт темы
import theme from './theme';

// Настройка Redux store
const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [mockApi.reducerPath]: mockApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware).concat(mockApi.middleware),
});

// Настройка слушателей для RTK Query
setupListeners(store.dispatch);

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
          >
            <Header />
            <Box sx={{ flexGrow: 1 }}>
              <Routes>
                <Route path="/" element={<Catalog />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/game/:id" element={<GameDetails />} />
              </Routes>
            </Box>
            <Footer />
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
