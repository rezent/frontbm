// Базовые типы для API
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  errors?: string[];
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Типы для пользователя
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  avatar?: string;
  company?: string;
  position?: string;
}

// Типы для аутентификации
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// Типы для товаров
export interface ProductOption {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export interface ProductOptions {
  adapter?: ProductOption[];
  height?: ProductOption[];
  rating?: ProductOption[];
  [key: string]: ProductOption[] | undefined;
}

export interface SelectedOptions {
  adapter?: string;
  height?: string;
  rating?: string;
  [key: string]: string | undefined;
}

export interface ProductSpecification {
  material?: string;
  application?: string;
  dimensions?: string;
  weight?: string;
  [key: string]: string | undefined;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  price: number;
  oldPrice?: number | null;
  images: string[];
  mainImage?: string;
  isNew?: boolean;
  discount?: boolean;
  inStock?: boolean;
  stockQuantity?: number;
  specifications?: ProductSpecification;
  options?: ProductOptions;
  category: string;
  tags?: string[];
  sku?: string;
  createdAt: string;
  updatedAt: string;
}

// Типы для корзины
export interface CartItem {
  id: string;
  productId: string;
  title: string;
  description: string;
  price: number;
  oldPrice?: number | null;
  images: string[];
  mainImage?: string;
  isNew?: boolean;
  discount?: boolean;
  inStock?: boolean;
  specifications?: ProductSpecification;
  options?: ProductOptions;
  quantity: number;
  selectedOptions?: SelectedOptions;
  totalPrice?: number;
}

// Типы для заказов
export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  selectedOptions?: SelectedOptions;
  totalPrice: number;
}

export interface OrderAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: OrderAddress;
  billingAddress?: OrderAddress;
  paymentMethod: 'card' | 'cash' | 'bank_transfer';
  paymentStatus: 'pending' | 'paid' | 'failed';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Типы для категорий
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  children?: Category[];
  productCount?: number;
  createdAt: string;
  updatedAt: string;
}

// Типы для поиска и фильтрации
export interface SearchFilters {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  inStock?: boolean;
  isNew?: boolean;
  discount?: boolean;
  tags?: string[];
  [key: string]: any;
}

export interface SearchParams {
  query?: string;
  filters?: SearchFilters;
  sort?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'newest' | 'popular';
  page?: number;
  limit?: number;
}

// Типы для отзывов
export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title?: string;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

// Типы для уведомлений
export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

// Типы для модальных окон
export interface ModalConfig {
  id: string;
  title?: string;
  component: any;
  props?: Record<string, any>;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closable?: boolean;
}

// Типы для страниц
export interface PageMeta {
  title: string;
  description: string;
  keywords?: string;
  url: string;
  image?: string;
  type?: string;
}

// Типы для фильтрации
export interface FilterState {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  inStock?: boolean;
  search?: string;
  sortBy?: 'name' | 'price' | 'rating' | 'newest';
  sortOrder?: 'asc' | 'desc';
} 