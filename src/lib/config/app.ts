// Конфигурация приложения
export const APP_CONFIG = {
  // Основные настройки
  name: 'BM Filter',
  version: '1.0.0',
  description: 'Интернет-магазин фильтрующих элементов',

  // API настройки
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
    timeout: 10000,
    retryAttempts: 3,
    retryDelay: 1000,
  },

  // Настройки аутентификации
  auth: {
    tokenKey: 'authToken',
    refreshTokenKey: 'refreshToken',
    userKey: 'user',
    tokenExpiryThreshold: 5 * 60 * 1000, // 5 минут
    autoRefresh: true,
  },

  // Настройки корзины
  cart: {
    storageKey: 'cart',
    maxItems: 100,
    autoSave: true,
  },

  // Настройки пагинации
  pagination: {
    defaultPageSize: 12,
    maxPageSize: 100,
    pageSizeOptions: [12, 24, 48, 96],
  },

  // Настройки поиска
  search: {
    minQueryLength: 2,
    debounceDelay: 300,
    maxResults: 50,
  },

  // Настройки изображений
  images: {
    placeholder: '/img/placeholder.jpg',
    formats: ['jpg', 'jpeg', 'png', 'webp'],
    maxSize: 5 * 1024 * 1024, // 5MB
    quality: 0.8,
  },

  // Настройки уведомлений
  notifications: {
    autoHide: true,
    autoHideDelay: 5000,
    maxVisible: 5,
    position: 'top-right',
  },

  // Настройки валюты
  currency: {
    code: 'RUB',
    symbol: '₽',
    name: 'Российский рубль',
    format: 'ru-RU',
  },

  // Настройки доставки
  shipping: {
    freeThreshold: 10000, // Бесплатная доставка от 10000 руб
    defaultCost: 500,
    methods: [
      { id: 'pickup', name: 'Самовывоз', cost: 0 },
      { id: 'courier', name: 'Курьер', cost: 500 },
      { id: 'post', name: 'Почта России', cost: 300 },
    ],
  },

  // Настройки платежей
  payments: {
    methods: [
      { id: 'card', name: 'Банковская карта', icon: 'credit-card' },
      { id: 'cash', name: 'Наличными при получении', icon: 'cash' },
      { id: 'bank_transfer', name: 'Банковский перевод', icon: 'bank' },
    ],
  },

  // Настройки SEO
  seo: {
    defaultTitle: 'BM Filter - Фильтрующие элементы',
    defaultDescription: 'Качественные фильтрующие элементы для промышленного применения',
    defaultKeywords: 'фильтры, фильтроэлементы, промышленные фильтры',
    defaultImage: '/img/og-image.jpg',
    siteUrl: import.meta.env.VITE_SITE_URL || 'https://bmfilter.ru',
  },

  // Настройки социальных сетей
  social: {
    facebook: 'https://facebook.com/bmfilter',
    instagram: 'https://instagram.com/bmfilter',
    telegram: 'https://t.me/bmfilter',
    whatsapp: 'https://wa.me/79991234567',
  },

  // Контактная информация
  contacts: {
    phone: '+7 (999) 123-45-67',
    email: 'info@bmfilter.ru',
    address: 'г. Москва, ул. Примерная, д. 1',
    workingHours: 'Пн-Пт: 9:00-18:00, Сб: 10:00-16:00',
  },

  // Настройки разработки
  development: {
    mockApi: import.meta.env.VITE_MOCK_API === 'true',
    debugMode: import.meta.env.DEV,
    logLevel: import.meta.env.DEV ? 'debug' : 'error',
  },
} as const;

// Типы для конфигурации
export type AppConfig = typeof APP_CONFIG;

// Утилиты для работы с конфигурацией
export const configUtils = {
  // Получение значения конфигурации по пути
  get: <T>(path: string, defaultValue?: T): T => {
    const keys = path.split('.');
    let value: any = APP_CONFIG;

    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return defaultValue as T;
      }
    }

    return value as T;
  },

  // Проверка режима разработки
  isDevelopment: (): boolean => {
    return APP_CONFIG.development.debugMode;
  },

  // Проверка использования моков
  useMockApi: (): boolean => {
    return APP_CONFIG.development.mockApi;
  },

  // Получение полного URL
  getFullUrl: (path: string): string => {
    return `${APP_CONFIG.seo.siteUrl}${path}`;
  },

  // Получение API URL
  getApiUrl: (endpoint: string): string => {
    return `${APP_CONFIG.api.baseUrl}${endpoint}`;
  },
};

// Экспортируем конфигурацию по умолчанию
export default APP_CONFIG;
