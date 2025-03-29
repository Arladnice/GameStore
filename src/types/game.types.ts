// Типы данных для игр

export interface GameResponse {
  [appid: string]: {
    success: boolean;
    data: GameData;
  };
}

export interface GameData {
  type: string;
  name: string;
  steam_appid: number;
  required_age: number;
  is_free: boolean;
  dlc?: number[];
  detailed_description: string;
  about_the_game: string;
  short_description: string;
  supported_languages: string;
  header_image: string;
  capsule_image: string;
  website: string;
  developers: string[];
  publishers: string[];
  platforms: {
    windows: boolean;
    mac: boolean;
    linux: boolean;
  };
  categories: Category[];
  genres: Genre[];
  screenshots: Screenshot[];
  movies?: Movie[];
  recommendations?: {
    total: number;
  };
  release_date: {
    coming_soon: boolean;
    date: string;
  };
  price_overview?: {
    currency: string;
    initial: number;
    final: number;
    discount_percent: number;
  };
}

export interface Category {
  id: number;
  description: string;
}

export interface Genre {
  id: string;
  description: string;
}

export interface Screenshot {
  id: number;
  path_thumbnail: string;
  path_full: string;
}

export interface Movie {
  id: number;
  name: string;
  thumbnail: string;
  webm: {
    '480': string;
    max: string;
  };
  mp4: {
    '480': string;
    max: string;
  };
  highlight: boolean;
}

// Карточка игры для каталога (упрощенная версия)
export interface GameCard {
  appid: number;
  name: string;
  header_image: string;
  price: {
    initial?: number;
    final?: number;
    discount_percent?: number;
    is_free?: boolean;
  };
  genres: string[];
  platforms: {
    windows: boolean;
    mac: boolean;
    linux: boolean;
  };
  rating?: number;
}

// Параметры фильтрации для каталога
export interface GameFilters {
  priceRange: [number, number] | null;
  genres: string[];
  platforms: string[];
  searchQuery: string;
  onlyDiscount: boolean;
  sortBy: 'popular' | 'price_asc' | 'price_desc' | 'name' | 'release_date';
}
