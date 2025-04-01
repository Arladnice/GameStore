import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { Provider } from 'react-redux';

// Импорт компонентов страниц
import Catalog from './pages/Catalog';
import GameDetails from './pages/GameDetails';
import Header from './components/Header';
import Footer from './components/Footer';
import { store } from './services/store';
import theme from './theme';
import { appStyles } from './styles/app.styles';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Box sx={appStyles.container}>
            <Header />
            <Box sx={appStyles.content}>
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
