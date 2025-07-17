import { apiClient, API_ENDPOINTS } from '@shared/api';
import type { 
  ApiResponse,
  User,
  LoginRequest,
  RegisterRequest,
  AuthResponse
} from '@shared/types';

export class UserApi {
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