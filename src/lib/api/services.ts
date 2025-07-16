import { apiClient } from './client';
import { API_ENDPOINTS } from '$lib/types/api';
import type {
  Product,
  Category,
  CartItem,
  Order,
  User,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  SearchParams,
  SearchFilters,
  Review,
  Notification,
  ApiResponse,
  PaginatedResponse,
} from '$lib/types/api';

// Сервис для аутентификации
export class AuthService {
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.login,
      credentials
    );
    return response.data;
  }

  static async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.register,
      userData
    );
    return response.data;
  }

  static async logout(): Promise<void> {
    await apiClient.post(API_ENDPOINTS.logout);
    // Очищаем токены из localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
    }
  }

  static async refreshToken(): Promise<AuthResponse> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiClient.post<ApiResponse<AuthResponse>>(API_ENDPOINTS.refresh, {
      refreshToken,
    });
    return response.data;
  }

  static async getProfile(): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>(API_ENDPOINTS.profile);
    return response.data;
  }

  static async updateProfile(userData: Partial<User>): Promise<User> {
    const response = await apiClient.put<ApiResponse<User>>(API_ENDPOINTS.profile, userData);
    return response.data;
  }
}

// Сервис для работы с товарами
export class ProductService {
  static async getProducts(params?: SearchParams): Promise<PaginatedResponse<Product>> {
    const queryParams = new URLSearchParams();

    if (params?.query) queryParams.append('query', params.query);
    if (params?.sort) queryParams.append('sort', params.sort);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(`filters[${key}]`, value.toString());
        }
      });
    }

    const endpoint = `${API_ENDPOINTS.products}?${queryParams.toString()}`;
    return await apiClient.get<PaginatedResponse<Product>>(endpoint);
  }

  static async getProduct(id: string): Promise<Product> {
    const response = await apiClient.get<ApiResponse<Product>>(API_ENDPOINTS.product(id));
    return response.data;
  }

  static async getProductReviews(productId: string): Promise<Review[]> {
    const response = await apiClient.get<ApiResponse<Review[]>>(
      API_ENDPOINTS.productReviews(productId)
    );
    return response.data;
  }

  static async createReview(
    productId: string,
    review: Omit<Review, 'id' | 'productId' | 'userId' | 'createdAt' | 'updatedAt'>
  ): Promise<Review> {
    const response = await apiClient.post<ApiResponse<Review>>(
      API_ENDPOINTS.productReviews(productId),
      review
    );
    return response.data;
  }

  static async searchProducts(query: string, filters?: SearchFilters): Promise<Product[]> {
    const response = await apiClient.post<ApiResponse<Product[]>>(API_ENDPOINTS.search, {
      query,
      filters,
    });
    return response.data;
  }
}

// Сервис для работы с категориями
export class CategoryService {
  static async getCategories(): Promise<Category[]> {
    const response = await apiClient.get<ApiResponse<Category[]>>(API_ENDPOINTS.categories);
    return response.data;
  }

  static async getCategory(id: string): Promise<Category> {
    const response = await apiClient.get<ApiResponse<Category>>(API_ENDPOINTS.category(id));
    return response.data;
  }

  static async getCategoryProducts(
    categoryId: string,
    params?: Omit<SearchParams, 'category'>
  ): Promise<PaginatedResponse<Product>> {
    const queryParams = new URLSearchParams();

    if (params?.sort) queryParams.append('sort', params.sort);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(`filters[${key}]`, value.toString());
        }
      });
    }

    const endpoint = `${API_ENDPOINTS.category(categoryId)}/products?${queryParams.toString()}`;
    return await apiClient.get<PaginatedResponse<Product>>(endpoint);
  }
}

// Сервис для работы с корзиной
export class CartService {
  static async getCart(): Promise<CartItem[]> {
    const response = await apiClient.get<ApiResponse<CartItem[]>>(API_ENDPOINTS.cart);
    return response.data;
  }

  static async addToCart(item: Omit<CartItem, 'id'>): Promise<CartItem> {
    const response = await apiClient.post<ApiResponse<CartItem>>(API_ENDPOINTS.cart, item);
    return response.data;
  }

  static async updateCartItem(id: string, updates: Partial<CartItem>): Promise<CartItem> {
    const response = await apiClient.put<ApiResponse<CartItem>>(
      API_ENDPOINTS.cartItem(id),
      updates
    );
    return response.data;
  }

  static async removeFromCart(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.cartItem(id));
  }

  static async clearCart(): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.cart);
  }
}

// Сервис для работы с заказами
export class OrderService {
  static async getOrders(): Promise<Order[]> {
    const response = await apiClient.get<ApiResponse<Order[]>>(API_ENDPOINTS.orders);
    return response.data;
  }

  static async getOrder(id: string): Promise<Order> {
    const response = await apiClient.get<ApiResponse<Order>>(API_ENDPOINTS.order(id));
    return response.data;
  }

  static async createOrder(
    orderData: Omit<Order, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
  ): Promise<Order> {
    const response = await apiClient.post<ApiResponse<Order>>(API_ENDPOINTS.orders, orderData);
    return response.data;
  }

  static async updateOrder(id: string, updates: Partial<Order>): Promise<Order> {
    const response = await apiClient.put<ApiResponse<Order>>(API_ENDPOINTS.order(id), updates);
    return response.data;
  }

  static async cancelOrder(id: string): Promise<Order> {
    const response = await apiClient.patch<ApiResponse<Order>>(`${API_ENDPOINTS.order(id)}/cancel`);
    return response.data;
  }
}

// Сервис для работы с уведомлениями
export class NotificationService {
  static async getNotifications(): Promise<Notification[]> {
    const response = await apiClient.get<ApiResponse<Notification[]>>(API_ENDPOINTS.notifications);
    return response.data;
  }

  static async markAsRead(id: string): Promise<Notification> {
    const response = await apiClient.patch<ApiResponse<Notification>>(
      `${API_ENDPOINTS.notification(id)}/read`
    );
    return response.data;
  }

  static async markAllAsRead(): Promise<void> {
    await apiClient.patch(`${API_ENDPOINTS.notifications}/read-all`);
  }

  static async deleteNotification(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.notification(id));
  }
}
