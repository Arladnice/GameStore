import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameCard } from '../types/game.types';

interface GamesState {
  games: GameCard[];
  total: number;
  filteredTotal: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: GamesState = {
  games: [],
  total: 0,
  filteredTotal: 0,
  isLoading: false,
  error: null,
};

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setGames(
      state,
      action: PayloadAction<{ games: GameCard[]; total: number; filteredTotal: number }>
    ) {
      state.games = action.payload.games;
      state.total = action.payload.total;
      state.filteredTotal = action.payload.filteredTotal;
      state.isLoading = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setGames, setLoading, setError } = gamesSlice.actions;
export default gamesSlice.reducer;
