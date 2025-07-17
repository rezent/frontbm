// Конфигурация приложения
export const APP_CONFIG = {
  appName: 'Оборудование для микрофильтрации',
  companyName: 'ООО «БМ ФИЛЬТР»',
  description: 'Профессиональные решения для промышленной фильтрации',
  baseUrl: 'https://bmfilter.ru',
  apiUrl: '/api',
};

// Константы для API endpoints
export const API_ENDPOINTS = {
  // Auth
  login: '/api/auth/login',
  register: '/api/auth/register',
  logout: '/api/auth/logout',
  refresh: '/api/auth/refresh',
  profile: '/api/auth/profile',

  // Products
  products: '/api/products',
  product: (id: string) => `/api/products/${id}`,
  productReviews: (id: string) => `/api/products/${id}/reviews`,

  // Categories
  categories: '/api/categories',
  category: (id: string) => `/api/categories/${id}`,

  // Cart
  cart: '/api/cart',
  cartItem: (id: string) => `/api/cart/${id}`,

  // Orders
  orders: '/api/orders',
  order: (id: string) => `/api/orders/${id}`,

  // Search
  search: '/api/search',

  // Reviews
  reviews: '/api/reviews',
  review: (id: string) => `/api/reviews/${id}`,

  // Notifications
  notifications: '/api/notifications',
  notification: (id: string) => `/api/notifications/${id}`,
} as const;

// Экспорт для удобства
export const config = APP_CONFIG; 